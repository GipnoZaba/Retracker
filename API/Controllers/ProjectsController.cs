using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Projects;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Authorize]
    public class ProjectsController : BaseController
    {
        private readonly DataContext _context;

        public ProjectsController(DataContext context)
        {
            _context = context;
        }

        // project

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) 
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> Details(Guid id) 
        {
            return await Mediator.Send(new Details.Query{ Id = id });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command) 
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
        
        // lists
        
        [HttpPost("lists")]
        public async Task<ActionResult<Unit>> CreateList(CreateList.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("lists/{id}")]
        public async Task<ActionResult<ProjectListDto>> ListDetails(Guid id)
        {
            return await Mediator.Send(new ListDetails.Query{ Id = id });
        }

        [HttpPut("lists/{id}")]
        public async Task<ActionResult<Unit>> EditList(Guid id, EditList.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("lists/{id}")]
        public async Task<ActionResult<Unit>> DeleteList(Guid id)
        {
            return await Mediator.Send(new DeleteList.Command{ Id = id });
        }

        // tasks

        [HttpPost("lists/tasks")]
        public async Task<ActionResult<Unit>> CreateTask(CreateTask.Command command)
        {
            await Mediator.Send(new Application.AppTasks.Create.Command 
            { 
                Id = command.Id,
                Title = command.Title,
                DateCreated = command.DateCreated 
            });

            return await Mediator.Send(command);
        }

        [HttpGet("lists/tasks/{id}")]
        public async Task<ActionResult<ProjectTaskDto>> TaskDetails(Guid id)
        {
            return await Mediator.Send(new TaskDetails.Query{ Id = id });
        }

        [HttpPut("lists/tasks/{id}")]
        public async Task<ActionResult<Unit>> EditTask(Guid id, Edit.Command command)
        {
            command.Id = id;

            await Mediator.Send(new Application.AppTasks.Edit.Command
            {
                Id = command.Id,
                Title = command.Title
            });

            return await Mediator.Send(command);
        }

        [HttpPatch("lists/tasks/{id}/complete")]
        public async Task<ActionResult<Unit>> CompleteTask(Guid id)
        {
            await Mediator.Send(new Application.AppTasks.Complete.Command
            {
                Id = id
            });

            return await Mediator.Send(new CompleteTask.Command{ Id = id });
        }

        [HttpPatch("lists/tasks/{id}/restore")]
        public async Task<ActionResult<Unit>> RestoreTask(Guid id)
        {
            await Mediator.Send(new Application.AppTasks.Restore.Command
            {
                Id = id
            });

            return await Mediator.Send(new RestoreTask.Command{ Id = id });
        }

        [HttpDelete("lists/tasks/{id}")]
        public async Task<ActionResult<Unit>> DeleteTask(Guid id)
        {
            await Mediator.Send(new Application.AppTasks.Delete.Command
            {
                Id = id
            });

            return await Mediator.Send(new DeleteTask.Command{ Id = id });
        }
    }
}