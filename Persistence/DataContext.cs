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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppTask>()
                .HasData(
                    new AppTask {Id = 1, Title = "Task1"},
                    new AppTask {Id = 2, Title = "Task2"},
                    new AppTask {Id = 3, Title = "Task3"}
                );
        }
    }
}