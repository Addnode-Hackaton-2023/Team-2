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
        public IEnumerable<Stoppoint> GetActiveStoppoints();
        public int PostStoppoints(IEnumerable<Stoppoint> stoppoints);
        public int UpdateStoppoints(IEnumerable<Stoppoint> stoppoints);

    }
}
