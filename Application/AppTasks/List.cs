using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTasks
{
    public class List
    {
        public class Query : IRequest<List<AppTask>> { }

        public class Handler : IRequestHandler<Query, List<AppTask>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<AppTask>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appTasks = await _context.AppTasks.ToListAsync();

                return appTasks;
            }
        }
    }
}