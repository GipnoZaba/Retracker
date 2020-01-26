using System.Net;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.AppTasks
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime? Date { get; set; }
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

                appTask.Title = request.Title ?? appTask.Title;
                appTask.Description = request.Description ?? appTask.Description;
                appTask.Date = request.Date ?? appTask.Date;

                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem while editing task.");
            }
        }
    }
}