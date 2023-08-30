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
        public IEnumerable<StoppointAdress> GetActiveStoppoints();
    }
}
