using Domain;
using Domain.Projects;
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
        public DbSet<Project> Projects { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }
        public DbSet<ProjectList> ProjectLists { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }

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

            
            builder.Entity<UserProject>(x => x.HasKey(up =>
                new { up.AppUserId, up.ProjectId }));

            builder.Entity<UserProject>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserProjects)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserProject>()
                .HasOne(u => u.Project)
                .WithMany(a => a.UserProjects)
                .HasForeignKey(u => u.ProjectId);

            builder.Entity<ProjectList>()
                .HasOne(l => l.Project)
                .WithMany(p => p.Lists)
                .HasForeignKey(l => l.ProjectId);

            builder.Entity<ProjectTask>()
                .HasOne(t => t.ProjectList)
                .WithMany(l => l.Tasks)
                .HasForeignKey(t => t.ProjectListId);
        }
    }
}