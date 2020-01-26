using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AppTasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Authorize]
    public class AppTasksController : BaseController
    {
        private readonly DataContext _context;
        public AppTasksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AppTaskDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppTask>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{ Id = id });
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsAppTaskCreator")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPatch("{id}/complete")]
        [Authorize(Policy = "IsAppTaskCreator")]
        public async Task<ActionResult<Unit>> Complete(Guid id)
        {
            return await Mediator.Send(new Complete.Command{ Id = id });
        }

        [HttpPatch("{id}/restore")]
        [Authorize(Policy = "IsAppTaskCreator")]
        public async Task<ActionResult<Unit>> Restore(Guid id)
        {
            return await Mediator.Send(new Restore.Command{ Id = id });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{ Id = id });
        }
    }
}
