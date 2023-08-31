using Flyt.DTO;
using Flyt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt
{
    public interface IDataService
    {
        public IEnumerable<StoppointGetDTO> GetActiveStoppoints();
        public int PostStoppoints(IEnumerable<StoppointPostDTO> stoppoints);
        public int UpdateStoppoints(IEnumerable<Stoppoint> stoppoints);

    }
}
