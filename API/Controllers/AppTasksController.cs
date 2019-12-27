using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppTasksController : ControllerBase
    {
        private readonly DataContext _context;
        public AppTasksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppTask>>> GetAction()
        {
            var appTasks = await _context.AppTasks.ToListAsync();
            return Ok(appTasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppTask>> Get(int id)
        {
            var appTask = await _context.AppTasks.FindAsync(id);
            return Ok(appTask);
        }
    }
}
