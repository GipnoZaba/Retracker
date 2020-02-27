using System;
using Domain.Projects;

namespace Domain
{
    public class UserAppTask
    {
        public Guid AppTaskId { get; set; }
        public virtual AppTask AppTask { get; set; }
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public bool IsCreator { get; set; }
    }
}