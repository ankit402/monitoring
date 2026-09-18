using System.Data;

namespace MonitoringAPI.Data
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}
