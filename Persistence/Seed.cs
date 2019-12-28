using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (context.AppTasks.Any() == false)
            {
                var appTasks = new List<AppTask>
                {
                    new AppTask { Title = "Wash dishes"},
                    new AppTask { Title = "Gym"},
                    new AppTask { Title = "Agile homework"},
                    new AppTask { Title = "Morning routine"},
                    new AppTask { Title = "Read chapter"}
                };

                context.AddRange(appTasks);
                context.SaveChanges();
            }
        }
    }
}
