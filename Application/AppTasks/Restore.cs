using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.AppTasks
{
    public class Restore
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appTask = await _context.AppTasks.FindAsync(request.Id);

                if (appTask == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Task = "Not found" });
                } 
                else if (!appTask.IsDone)
                {
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { Completeness = "Task was already completed" });
                }

                appTask.IsDone = false;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem while completing task");
            }
        }
    }
}