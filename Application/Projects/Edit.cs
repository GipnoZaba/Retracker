using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain.Projects;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
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
                Project project = await _context.Projects.FindAsync(request.Id);

                if (project == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Project = "Not found" });
                }

                project.Title = request.Title ?? project.Title;
                project.Description = request.Description ?? project.Description;

                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem while editing project.");
            }
        }
    }
}