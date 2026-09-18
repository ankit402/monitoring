using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonitoringAPI.Repositories;

namespace MonitoringAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileRepository _repository;

        public FileController(IFileRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        // Remove [Authorize] during initial testing
        // Add it when JWT authentication is configured.
       
        public async Task<IActionResult> GetFiles()
        {
           var filesData = await _repository.GetFilesAsync();
            return Ok(filesData);
        }
        // GET: api/File/count
        [HttpGet("count")]
        public async Task<IActionResult> GetFilesCount()
        {
            var getCount = await _repository.GetFilesAsyncCount();
            return Ok(getCount);
        }
    }
}
