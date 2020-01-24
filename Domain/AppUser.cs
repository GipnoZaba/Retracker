using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<UserAppTask> UserAppTasks { get; set; }
    }
}