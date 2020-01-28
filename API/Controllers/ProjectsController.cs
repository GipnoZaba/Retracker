using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Projects;
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

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}