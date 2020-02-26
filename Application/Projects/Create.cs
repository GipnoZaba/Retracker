using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain.Projects;

namespace Application.Projects
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
                Project project = new Project
                {
                    Id = request.Id,
                    Title = request.Title,
                    DateCreated = request.DateCreated
                };

                _context.Projects.Add(project);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var creator = new UserProject
                {
                    AppUser = user,
                    Project = project,
                    IsCreator = true
                };

                _context.UserProjects.Add(creator);

                bool isSaved = await _context.SaveChangesAsync() > 0;

                if (isSaved) return Unit.Value;

                throw new Exception("Proplem while creating project.");
            }
        }
    }
}