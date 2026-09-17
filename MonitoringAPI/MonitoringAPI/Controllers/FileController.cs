using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MonitoringAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpGet]
        // Remove [Authorize] during initial testing
        // Add it when JWT authentication is configured.
        public IActionResult GetFiles()
        {
            var filesData = new[]
            {
                new
                {
                    id = 1,
                    name = "EMB_BK07_20260911_1039.dat",
                    records = 12,
                    product = "Himyan Debit",
                    size = "27 KB",
                    pushed = "10=39=30",
                    destination = "Embossing · EM-01",
                    path = "/import/BK07/",
                    progress = 6,
                    status = "Completed"
                },
                new
                {
                    id = 2,
                    name = "EMB_BK07_20260911_1036.dat",
                    records = 24,
                    product = "Visa Classic Debit",
                    size = "49 KB",
                    pushed = "10=36=00",
                    destination = "Embossing · EM-03",
                    path = "/import/BK07/",
                    progress = 6,
                    status = "Done · 1 exception"
                   
                },
                new
                {
                    id = 3,
                    name = "EMB_BK07_20260911_1026.dat",
                    records = 24,
                    product = "Visa Classic Debit",
                    size = "49 KB",
                    pushed = "10=26=31",
                    destination = "Not forwarded",
                    path = "held in /inbound/BK07/rejected",
                    progress = 2,
                    status = "Rejected"
                 
                },
                new
                {
                    id = 4,
                    name = "EMB_BK07_20260911_1012.dat",
                    records = 40,
                    product = "Mastercard World Credit",
                    size = "79 KB",
                    pushed = "10=12=02",
                    destination = "Embossing · EM-02",
                    path = "/import/BK07/",
                    progress = 6,
                    status = "Done · 1 exception"
                   
                },
                new
                {
                    id = 5,
                    name = "EMB_BK07_20260911_0937.dat",
                    records = 28,
                    product = "Himyan Debit",
                    size = "56 KB",
                    pushed = "09=37=05",
                    destination = "Embossing · EM-01",
                    path = "/import/BK07/",
                    progress = 6,
                    status = "Done · 1 exception"
                  
                },
                new
                {
                    id = 6,
                    name = "EMB_BK07_20260911_0850.dat",
                    records = 40,
                    product = "Mastercard World Credit",
                    size = "79 KB",
                    pushed = "08=50=47",
                    destination = "Embossing · EM-02",
                    path = "/import/BK07/",
                    progress = 6,
                    status = "Done · 2 exceptions"
                   
                },
                new
                {
                    id = 7,
                    name = "EMB_BK07_20260911_0805.dat",
                    records = 36,
                    product = "Visa Classic Debit",
                    size = "71 KB",
                    pushed = "08=05=12",
                    destination = "Embossing · EM-01",
                    path = "/import/BK07/",
                    progress = 6,
                    status = "Completed"
                   
                }
            };

            return Ok(filesData);
        }
    }
}
