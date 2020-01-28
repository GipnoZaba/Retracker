using System;

namespace Domain.Projects
{
    public class UserProject
    {
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public bool IsCreator { get; set; }
    }
}