using MonitoringAPI.Model;

namespace MonitoringAPI.Repositories
{
    public interface IFileRepository
    {
        Task<IEnumerable<FileRecord>> GetFilesAsync();
        Task<FileRecord?> GetFileByIdAsync(int id);
        Task<int> InsertFileAsync(FileRecord file);

        Task<int> GetFilesAsyncCount();
    }
}
