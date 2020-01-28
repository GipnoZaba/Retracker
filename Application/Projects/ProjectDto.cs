using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;
using Domain.Projects;

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
    }
}