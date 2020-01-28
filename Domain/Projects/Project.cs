using System;
using System.Collections.Generic;

namespace Domain.Projects
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public virtual ICollection<UserProject> UserProjects { get; set; }
        public virtual ICollection<ProjectList> Lists { get; set; }
    }
}