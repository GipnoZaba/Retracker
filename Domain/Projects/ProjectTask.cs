using System;
using System.Collections.Generic;

namespace Domain.Projects
{
    public class ProjectTask
    {
        public Guid AppTaskId { get; set; }
        public virtual AppTask AppTask { get; set; }
        public Guid ProjectListId { get; set; }
        public virtual ProjectList ProjectList { get; set; }
    }
}