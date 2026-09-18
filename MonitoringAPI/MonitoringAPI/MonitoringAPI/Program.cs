using MonitoringAPI.Data;
using MonitoringAPI.Model;
using MonitoringAPI.Repositories;
using MonitoringAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https=//aka.ms/aspnet/openapi

builder.Services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

builder.Services.AddScoped<IFileRepository, FileRepository>();

builder.Services.AddOpenApi();

builder.Services.Configure<SftpOptions>(
    builder.Configuration.GetSection("Sftp"));

builder.Services.AddHostedService<SftpWatcherService>();

var app = builder.Build();
// Create SQLite database and tables
var connectionString =
    app.Configuration.GetConnectionString("SQLite");

if (!string.IsNullOrWhiteSpace(connectionString))
{
    SqliteDatabaseInitializer.Initialize(connectionString);
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
