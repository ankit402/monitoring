using Microsoft.Data.Sqlite;
using Npgsql;
using System.Data;

namespace MonitoringAPI.Data
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        private readonly IConfiguration _configuration;
        public DbConnectionFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection CreateConnection()
        {
            var provider = _configuration["DatabaseProvider"];
            return provider?.ToLowerInvariant() switch
            {
                "postgresql" or "postgre" =>
                new NpgsqlConnection(_configuration.GetConnectionString("PostgreSQL"))
            ,
                "sqlite" =>
                    new SqliteConnection(
                        _configuration.GetConnectionString("SQLite")
                    ),

                _ => throw new InvalidOperationException(
                    $"Unsupported database provider: {provider}"
                    )
            };
        }
    }
}
