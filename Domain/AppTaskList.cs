using System;
using System.Collections.Generic;

namespace Domain
{
    public class AppTaskList
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid UserId { get; set; }
        public virtual ICollection<AppTask> AppTasks { get; set; }
    }
}