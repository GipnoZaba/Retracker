using System;
using System.Collections.Generic;

namespace Domain.Projects
{
    public class ProjectList
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public DateTime DueDate { get; set; }
        public virtual ICollection<ProjectTask> Tasks { get; set; }
    }
}