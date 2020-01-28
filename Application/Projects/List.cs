using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain.Projects;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<List<ProjectDto>> { }

        public class Handler : IRequestHandler<Query, List<ProjectDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Projects
                    .AsQueryable();

                queryable = queryable.Where(x => x.UserProjects
                    .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));

                return _mapper.Map<List<Project>, List<ProjectDto>>(await queryable.ToListAsync());
            }
        }
    }
}