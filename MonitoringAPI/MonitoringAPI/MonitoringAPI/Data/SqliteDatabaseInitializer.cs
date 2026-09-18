using Microsoft.Data.Sqlite;

namespace MonitoringAPI.Data
{
    public static class SqliteDatabaseInitializer
    {
        public static void Initialize(string connectionString)
        {
            using var connection = new SqliteConnection(connectionString);

            connection.Open();

            const string sql = """
            CREATE TABLE IF NOT EXISTS files
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                product TEXT,
                records INTEGER NOT NULL DEFAULT 0,
                size TEXT,
                pushed TEXT,
                destination TEXT,
                path TEXT,
                progress INTEGER NOT NULL DEFAULT 0,
                status TEXT,
                status_type TEXT
            );
            """;

            using var command = connection.CreateCommand();

            command.CommandText = sql;

            command.ExecuteNonQuery();
        }
    }
}