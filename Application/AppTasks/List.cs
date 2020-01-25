using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTasks
{
    public class List
    {
        public class Query : IRequest<List<AppTaskDto>> { }

        public class Handler : IRequestHandler<Query, List<AppTaskDto>>
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

            public async Task<List<AppTaskDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.AppTasks
                    .AsQueryable();

                queryable = queryable.Where(x => x.UserAppTasks
                    .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));

                return _mapper.Map<List<AppTask>, List<AppTaskDto>>(await queryable.ToListAsync());
            }
        }
    }
}