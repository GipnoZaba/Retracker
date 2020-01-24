using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppTask> AppTasks { get; set; }
        public DbSet<UserAppTask> UserAppTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserAppTask>(x => x.HasKey(ua =>
                new { ua.AppUserId, ua.AppTaskId }));

            builder.Entity<UserAppTask>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserAppTasks)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserAppTask>()
                .HasOne(u => u.AppTask)
                .WithMany(a => a.UserAppTasks)
                .HasForeignKey(u => u.AppTaskId);
        }
    }
}