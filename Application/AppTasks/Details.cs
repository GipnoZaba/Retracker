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
    public class Details
    {
        public class Query : IRequest<AppTask>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppTask>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<AppTask> Handle(Query request, CancellationToken cancellationToken)
            {
                var appTask = await _context.AppTasks.FindAsync(request.Id);

                if (appTask == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Task = "Not found" });
                }

                return appTask;
            }
        }
    }
}