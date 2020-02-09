using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.AppTasks
{
    public class AppTaskDto
    {
        public Guid Id { get; set; }
        public int OrderIndex { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [JsonPropertyName("dateCreated")]
        public DateTime DateCreated { get; set; }
        public bool IsDone { get; set; }
        [JsonPropertyName("members")]
        public ICollection<MemberDto> UserAppTasks { get; set; }
    }
}