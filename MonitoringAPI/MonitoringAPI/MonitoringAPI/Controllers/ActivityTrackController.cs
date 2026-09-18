using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Timers;

namespace MonitoringAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityTrackController : ControllerBase
    {
        public IActionResult GetActivityTracker()
        {
            var getActivity = new[]
            {
                new
                {
                    time= "10=43=15",
                    eventdata= "Printing completed",
                    type= "warning",
                    sourceFile= "EMB_BK07_20260911_1036.dat",
                    capturedFrom= "Embossing system",
                    detail= "23 cards printed · 1 held for reprint",
                },
                new
                {
                    time= "10:42:55",
                    eventdata= "Printing completed",
                    type="success",
                    sourceFile= "EMB_BK07_20260911_1039.dat",
                    capturedFrom="Embossing system",
                    detail= "12 cards printed",
                },
            };
            return Ok(getActivity);
            
        }
    }
}
