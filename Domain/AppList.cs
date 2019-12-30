using System;
using System.Collections.Generic;

namespace Domain
{
    public class AppList
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public ICollection<AppTask> AppTasks { get; set; }
    }
}