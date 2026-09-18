using Dapper;
using MonitoringAPI.Data;
using MonitoringAPI.Model;
using System.Collections;

namespace MonitoringAPI.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;
        public FileRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory= connectionFactory;
        }
        public Task<FileRecord?> GetFileByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<FileRecord>> GetFilesAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            try
            {
                const string sql = """select * from files ORDER BY id DESC;""";
                return await connection.QueryAsync<FileRecord>(sql);
            }
            catch (Exception ex)
            {
                return await connection.QueryAsync<FileRecord>(ex.Message); 
            }
        }
        public async Task<int> GetFilesAsyncCount()
        {
            using var connection = _connectionFactory.CreateConnection();
            try
            {
                const string sql = """select count(*) as FileCount from files ORDER BY id DESC;""";
                return await connection.ExecuteScalarAsync<int>(sql);
            }
            catch (Exception ex)
            {
                return await connection.ExecuteScalarAsync<int>(ex.Message);
            }
        }
        public async Task<bool> FileExistsByNameAsync(
    string name)
        {
            using var connection =
                _connectionFactory.CreateConnection();

            const string sql = """
                SELECT COUNT(1)
                FROM files
                WHERE name = @Name;
                """;

            var count = await connection.ExecuteScalarAsync<int>(
                sql,
                new
                {
                    Name = name
                });

            return count > 0;
        }
        public async Task<int> InsertFileAsync(
        FileRecord file)
        {
            using var connection =
                _connectionFactory.CreateConnection();
            bool result = await FileExistsByNameAsync(file.Name);
            if (result)
            { 
                return 0; 
            }
            const string sql = """
            INSERT INTO files
            (
                name,
                product,
                records,
                size,
                pushed,
                destination,
                path,
                progress,
                status,
                status_type
            )
            VALUES
            (
                @Name,
                @Product,
                @Records,
                @Size,
                @Pushed,
                @Destination,
                @Path,
                @Progress,
                @Status,
                @StatusType
            );

            SELECT last_insert_rowid();
            """;

            return await connection.ExecuteScalarAsync<int>(
                sql,
                file);
        }

      
    }
}
