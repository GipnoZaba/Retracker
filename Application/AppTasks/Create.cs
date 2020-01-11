using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System.Linq;

namespace Application.AppTasks
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
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
                AppTask appTask = new AppTask 
                {
                    Id = request.Id,
                    OrderIndex = _context.AppTasks.Count(),
                    Title = request.Title
                };

                _context.Add(appTask);
                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved) return Unit.Value;

                throw new Exception("Proplem while creating task.");
            }
        }
    }
}