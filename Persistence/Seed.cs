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
                    new AppTask { Title = "Wash dishes", IsDone = false},
                    new AppTask { Title = "Gym", IsDone = false},
                    new AppTask { Title = "Agile homework", IsDone = true},
                    new AppTask { Title = "Morning routine", IsDone = true},
                    new AppTask { Title = "Read chapter", IsDone = false}
                };

                context.AddRange(appTasks);
                context.SaveChanges();
            }
        }
    }
}
