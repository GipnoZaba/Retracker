using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain.Projects;
using Domain;

namespace Application.Projects
{
    public class CreateTask 
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public ProjectList ProjectList { get; set; }
            public Project Project { get; set; }
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
                var appTask = await _context.AppTasks.SingleOrDefaultAsync(x => x.Id == request.Id);
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                ProjectTask projectTask = new ProjectTask
                {
                    ProjectList = request.ProjectList
                };

                _context.ProjectTasks.Add(projectTask);

                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved) return Unit.Value;

                throw new Exception("Proplem while creating project.");
            }
        }
    }
}