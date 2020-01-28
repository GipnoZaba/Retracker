using System;

namespace Domain.Projects
{
    public class ProjectTask
    {
        public Guid Id { get; set; }
        public Guid ProjectListId { get; set; }
        public virtual ProjectList ProjectList { get; set; }
        public string Title { get; set; }
    }
}