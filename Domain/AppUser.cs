using System.Collections.Generic;
using Domain.Projects;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<UserAppTask> UserAppTasks { get; set; }
        public virtual ICollection<UserProject> UserProjects { get; set; }
    }
}