using System.Net;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Errors;

namespace Application.AppTasks
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                _context.Remove(appTask);

                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem while deleting task.");
            }
        }
    }
}