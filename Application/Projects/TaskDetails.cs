using System.Net;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;
using Domain.Projects;
using AutoMapper;
using Application.Interfaces;

namespace Application.Projects
{
    public class TaskDetails
    {
        public class Query : IRequest<ProjectTaskDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProjectTaskDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectTaskDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var projectTask = await _context.ProjectTasks.FindAsync(request.Id);

                if (projectTask == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { ProjectTask = "Not found" });
                }

                return _mapper.Map<ProjectTask, ProjectTaskDto>(projectTask);
            }
        }
    }
}