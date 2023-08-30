using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.Models
{
    public class Route
    {
        public int Id { get; set; }
        public Driver Driver { get; set; }
        public Vehicle Vehicle { get; set; }
        public Stoppoint Stoppoint { get; set; }
        public DateTime Date { get; set; }
    }
}
