using Microsoft.Extensions.Options;
using MonitoringAPI.Model;
using MonitoringAPI.Repositories;
using Renci.SshNet;
using Renci.SshNet.Sftp;

namespace MonitoringAPI.Services;

public class SftpWatcherService : BackgroundService
{
    private readonly ILogger<SftpWatcherService> _logger;
    private readonly SftpOptions _options;
    private readonly IServiceScopeFactory _scopeFactory;

    public SftpWatcherService(
        ILogger<SftpWatcherService> logger,
        IOptions<SftpOptions> options,
        IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _options = options.Value;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        _logger.LogInformation(
            "SFTP watcher started for folder {RemotePath}",
            _options.RemotePath);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CheckSftpFolderAsync(stoppingToken);
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation(
                    "SFTP watcher cancellation requested.");
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while checking SFTP folder.");
            }

            await Task.Delay(
                TimeSpan.FromSeconds(
                    _options.PollingIntervalSeconds),
                stoppingToken);
        }

        _logger.LogInformation("SFTP watcher stopped.");
    }

    private async Task CheckSftpFolderAsync(
        CancellationToken cancellationToken)
    {
        using var sftp = new SftpClient(
            _options.Host,
            _options.Port,
            _options.Username,
            _options.Password);

        try
        {
            _logger.LogInformation(
                "Connecting to SFTP {Host}:{Port}",
                _options.Host,
                _options.Port);

            sftp.Connect();

            _logger.LogInformation(
                "SFTP connected: {IsConnected}",
                sftp.IsConnected);

            if (!sftp.Exists(_options.RemotePath))
            {
                _logger.LogWarning(
                    "Remote folder does not exist: {RemotePath}",
                    _options.RemotePath);

                return;
            }

            var entries = sftp
                .ListDirectory(_options.RemotePath)
                .ToList();

            var files = entries
                .Where(file =>
                    !file.IsDirectory &&
                    !file.IsSymbolicLink &&
                    !file.Name.StartsWith("."))
                .ToList();

            _logger.LogInformation(
                "Files eligible for processing: {Count}",
                files.Count);

            foreach (var file in files)
            {
                cancellationToken.ThrowIfCancellationRequested();

                // Correct method call
                await ProcessFileAsync(
                    sftp,
                    file,
                    cancellationToken);
            }
        }
        finally
        {
            if (sftp.IsConnected)
            {
                sftp.Disconnect();
            }
        }
    }

    private async Task ProcessFileAsync(
        SftpClient sftp,
        ISftpFile file,
        CancellationToken cancellationToken)
    {
        try
        {
            cancellationToken.ThrowIfCancellationRequested();

            _logger.LogInformation(
                "SFTP file found: {FileName}, Size: {FileSize}",
                file.Name,
                file.Length);

            using var scope =
                _scopeFactory.CreateScope();

            var repository =
                scope.ServiceProvider
                    .GetRequiredService<IFileRepository>();

            var fileRecord = new FileRecord
            {
                Name = file.Name,

                Product = "Dhofar",

                Records = 0,

                // Your model currently expects string
                Size = file.Length.ToString(),

                Pushed = "No",

                Destination = _options.ProcessedPath,

                Path = file.FullName,

                Progress = 0,

                Status = "New",

                StatusType = "Pending"
            };

            var insertedId =
                await repository.InsertFileAsync(fileRecord);

            _logger.LogInformation(
                "File inserted into files table. Id={FileId}, Name={FileName}",
                insertedId,
                file.Name);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Failed to insert SFTP file {FileName} into files table",
                file.Name);
        }
    }
}