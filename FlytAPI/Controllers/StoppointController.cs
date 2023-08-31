using Flyt;
using Flyt.DTO;
using Flyt.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlytAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoppointController : Controller
    {
        private IDataService dataService;

        public StoppointController(IDataService _dataService)
        {
            dataService = _dataService;
        }

        [HttpGet]
        public ActionResult<List<StoppointGetDTO>> Get()
        {
            return Ok(dataService.GetActiveStoppoints().ToList());
        }

        [HttpPost]
        public ActionResult Post([FromBody] ICollection<StoppointPostDTO> stoppoints)
        {
            return Ok(dataService.PostStoppoints(stoppoints));
        }
    }
}
