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
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
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
                    new AppTask
                    {
                        Title = "Wash dishes",
                        OrderIndex = 1,
                        Description = "Wash dishes Wash dishes Wash dishes",
                        UserAppTasks = new List<UserAppTask>
                        {
                            new UserAppTask
                            {
                                AppUserId = "a",
                                IsCreator = true
                            }
                        }
                    },
                    new AppTask
                    {
                        Title = "Gym",
                        OrderIndex = 2,
                        Description = "Gym Gym Gym Gym Gym Gym Gym Gym",
                        UserAppTasks = new List<UserAppTask>
                        {
                            new UserAppTask
                            {
                                AppUserId = "a",
                                IsCreator = true
                            }
                        }
                    },
                    new AppTask
                    {
                        Title = "Agile homework",
                        OrderIndex = 3,
                        Description = "Agile homework Agile homework Agile homework Agile homework",
                        UserAppTasks = new List<UserAppTask>
                        {
                            new UserAppTask
                            {
                                AppUserId = "a",
                                IsCreator = true
                            },
                            new UserAppTask
                            {
                                AppUserId = "b",
                                IsCreator = false
                            }
                        }
                    },
                    new AppTask
                    {
                        Title = "Morning routine",
                        OrderIndex = 4,
                        Description = "Morning routine Morning routine Morning routine Morning routine",
                        UserAppTasks = new List<UserAppTask>
                        {
                            new UserAppTask
                            {
                                AppUserId = "b",
                                IsCreator = true
                            }
                        }
                    },
                    new AppTask
                    {
                        Title = "Read chapter",
                        OrderIndex = 5,
                        Description = "Read chapter Read chapter Read chapter Read chapter Read chapter",
                        UserAppTasks = new List<UserAppTask>
                        {
                            new UserAppTask
                            {
                                AppUserId = "b",
                                IsCreator = true
                            }
                        }
                    }
                };

                context.AddRange(appTasks);
                context.SaveChanges();
            }
        }
    }
}
