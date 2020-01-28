using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System.Linq;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.AppTasks
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime DateCreated { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                AppTask appTask = new AppTask
                {
                    Id = request.Id,
                    OrderIndex = _context.UserAppTasks.Where(task => task.AppUser.UserName == _userAccessor.GetCurrentUsername()).Count(),
                    Title = request.Title,
                    DateCreated = request.DateCreated
                };

                _context.AppTasks.Add(appTask);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var creator = new UserAppTask
                {
                    AppUser = user,
                    AppTask = appTask,
                    IsCreator = true
                };

                _context.UserAppTasks.Add(creator);

                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved) return Unit.Value;

                throw new Exception("Proplem while creating task.");
            }
        }
    }
}