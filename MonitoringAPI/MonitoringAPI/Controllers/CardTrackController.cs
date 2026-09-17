using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MonitoringAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardTrackController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCardTrack()
        {
            var Cardtrack = new[]
            {
                new
                {
                    cardRef = "C10396",
                    cardNumber= "4455 12•• •••• 7922",
                    cardholder= "OMAR FAROOQ",
                    product= "Visa Classic Debit",
                    sourceFile= "EMB_BK07_20260911_1036.dat",
                    machine= "EM-03",
                    status= "Printed",
                    updated= "10=43=10"

                },
                new
                {   
                    cardRef= "C10395",
                    cardNumber= "4455 12•• •••• 2926",
                    cardholder= "SARA AL MAMARI",
                    product= "Visa Classic Debit",
                    sourceFile= "EMB_BK07_20260911_1036.dat",
                    machine= "EM-03",
                    status= "Printed",
                    updated= "10=43=07",

                }
            };
            return Ok(Cardtrack);
        }
    }
}
