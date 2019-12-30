using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.AppTasks
{
    public class Mark
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public bool IsDone { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                AppTask appTask = await _context.AppTasks.FindAsync(request.Id);            

                if (appTask == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Task = "Not found" });
                }

                appTask.IsDone = request.IsDone;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem while completing task");
            }
        }
    }
}