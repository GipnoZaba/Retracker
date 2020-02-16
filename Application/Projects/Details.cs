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
    public class Details
    {
        public class Query : IRequest<ProjectDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProjectDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);

                if (project == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Project = "Not found" });
                }

                return _mapper.Map<Project, ProjectDto>(project);
            }
        }
    }
}