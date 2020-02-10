using System;
using System.Collections.Generic;

namespace Domain
{
    public class AppTask
    {
        public Guid Id { get; set; }
        public int OrderIndex { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDone { get; set; }
        public virtual ICollection<UserAppTask> UserAppTasks { get; set; }
    }
}
