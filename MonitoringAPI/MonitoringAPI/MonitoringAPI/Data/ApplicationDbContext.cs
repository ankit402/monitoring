using Microsoft.EntityFrameworkCore;
using MonitoringAPI.Model;

namespace MonitoringAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<FileRecord> Files { get; set; }
    }
}
