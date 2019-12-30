using System;
using System.Collections.Generic;

namespace Domain
{
    public class AppProject
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public ICollection<AppList> Lists { get; set; }
    }
}