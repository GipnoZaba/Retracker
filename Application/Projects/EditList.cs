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
    public class EditList
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime? Deadline { get; set; }
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
                ProjectList projectList = await _context.ProjectLists.FindAsync(request.Id);

                if (projectList == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Project = "Not found" });
                }

                //projectList.Title = request.Title ?? project.Title;
                projectList.Deadline = request.Deadline ?? projectList.Deadline;

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