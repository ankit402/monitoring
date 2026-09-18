namespace MonitoringAPI.Model
{
    public class File
    {
        public string FileName { get; set; }
        public string Size { get; set; }
        public string Pushed { get; set; }
        public string Destination { get; set; }
        public string Progress { get; set; }
        public string Status { get; set; }
    }
}
