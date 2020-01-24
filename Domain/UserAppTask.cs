using System;

namespace Domain
{
    public class UserAppTask
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid AppTaskId { get; set; }
        public virtual AppTask AppTask { get; set; }
        public bool IsCreator { get; set; }
    }
}