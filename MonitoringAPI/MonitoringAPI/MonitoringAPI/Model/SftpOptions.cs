namespace MonitoringAPI.Model
{
    public class SftpOptions
    {
        public string Host { get; set; } = string.Empty;

        public int Port { get; set; } = 8022;

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string RemotePath { get; set; } = string.Empty;

        public string ProcessedPath { get; set; } = string.Empty;

        public string RejectedPath { get; set; } = string.Empty;

        public string LocalPath { get; set; } = string.Empty;

        public int PollingIntervalSeconds { get; set; } = 10;
    }
}
