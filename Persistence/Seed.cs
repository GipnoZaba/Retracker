using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any() == false) 
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "John",
                        UserName = "john",
                        Email = "john@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

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
