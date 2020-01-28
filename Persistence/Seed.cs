using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Projects;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            await SeedUsers(userManager);
            var appTasks = GetSeededTasks(context);
            var projects = GetSeededProjects(context);

            context.AddRange(appTasks);
            context.AddRange(projects);
            context.SaveChanges();
        }

        private async static Task SeedUsers(UserManager<AppUser> userManager)
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
        }

        private static List<AppTask> GetSeededTasks(DataContext context)
        {
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
                return appTasks;
            }
            return new List<AppTask>();
        }

        private static List<Project> GetSeededProjects(DataContext context)
        {
            if (context.Projects.Any() == false)
            {
                var projects = new List<Project>
                {
                    new Project
                    {
                        Title = "Retracker",
                        Description = "Planner, todo list and other lists",
                        DateCreated = DateTime.Today,
                        UserProjects = new List<UserProject>
                        {
                            new UserProject
                            {
                                AppUserId = "a",
                                IsCreator = true
                            },
                            new UserProject
                            {
                                AppUserId = "b",
                                IsCreator  = false
                            },
                            new UserProject
                            {
                                AppUserId = "c",
                                IsCreator  = false
                            }
                        },
                        Lists = new List<ProjectList>
                        {
                            new ProjectList
                            {
                                Tasks = new List<ProjectTask>
                                {
                                    new ProjectTask
                                    {
                                        Title = "Task1"
                                    },
                                    new ProjectTask
                                    {
                                        Title = "Task2"
                                    },
                                    new ProjectTask
                                    {
                                        Title = "Task3"
                                    },
                                    new ProjectTask
                                    {
                                        Title = "Task4"
                                    },
                                    new ProjectTask
                                    {
                                        Title = "Task5"
                                    },
                                    new ProjectTask
                                    {
                                        Title = "Task6"
                                    }
                                }
                            }
                        }
                    }
                };
                return projects;
            }
            return new List<Project>();
        }
    }
}