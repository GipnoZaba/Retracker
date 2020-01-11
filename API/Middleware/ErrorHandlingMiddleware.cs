using System;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context) 
        {
            try 
            {
                await _next(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception e, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;

            switch (e) 
            {
                case RestException re:
                    logger.LogError(e, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int) re.Code;
                    break;
                case Exception ex:
                    logger.LogError(e, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(ex.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;
            }
            
            context.Response.ContentType = "application/json";
            
            if (errors != null)
            {
                var result = JsonConvert.SerializeObject(new 
                {
                    errors
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}