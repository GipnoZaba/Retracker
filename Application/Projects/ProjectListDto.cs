using System;
using System.Collections.Generic;

namespace Application.Projects
{
    public class ProjectListDto
    {
        public Guid Id { get; set; }
        public DateTime Deadline { get; set; }
        public ICollection<ProjectTaskDto> Tasks { get; set; }
    }
}