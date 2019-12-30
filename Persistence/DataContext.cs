using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppTask> AppTasks { get; set; }
        //public DbSet<AppProject> AppProjects { get; set; }
        //public DbSet<AppList> AppLists { get; set; }
    }
}