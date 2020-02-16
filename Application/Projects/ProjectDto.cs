using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Projects
{
    public class ProjectDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        [JsonPropertyName("members")]
        public ICollection<MemberDto> UserProjects { get; set; }
        public ICollection<ProjectListDto> Lists { get; set; }
    }
}