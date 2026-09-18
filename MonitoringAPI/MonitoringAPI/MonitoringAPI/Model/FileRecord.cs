namespace MonitoringAPI.Model
{
    public class FileRecord
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Product { get; set; } = string.Empty;

        public int Records { get; set; }

        public string Size { get; set; } = string.Empty;

        public string Pushed { get; set; } = string.Empty;

        public string Destination { get; set; } = string.Empty;

        public string Path { get; set; } = string.Empty;

        public int Progress { get; set; }

        public string Status { get; set; } = string.Empty;

        public string StatusType { get; set; } = string.Empty;
    }
}
