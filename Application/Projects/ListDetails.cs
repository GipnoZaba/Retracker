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
    public class ListDetails
    {
        public class Query : IRequest<ProjectListDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProjectListDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectListDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var projectList = await _context.ProjectLists.FindAsync(request.Id);

                if (projectList == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { ProjectList = "Not found" });
                }

                return _mapper.Map<ProjectList, ProjectListDto>(projectList);
            }
        }
    }
}