using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;
using System;

namespace Infrastructure.Security
{
    public class IsCreatorRequirement : IAuthorizationRequirement
    {
    }

    public class IsCreatorRequirementHandler : AuthorizationHandler<IsCreatorRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsCreatorRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCreatorRequirement requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor.HttpContext
                    .User?
                    .Claims?
                    .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                    .Value;

                var appTaskId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

                var appTask = _context.AppTasks.FindAsync(appTaskId).Result;

                var creator = appTask.UserAppTasks.FirstOrDefault(x => x.IsCreator);

                if (creator?.AppUser?.UserName == currentUserName)
                {
                    context.Succeed(requirement);
                }
                else
                {
                    context.Fail();
                }
            }
            return Task.CompletedTask;
        }
    }
}