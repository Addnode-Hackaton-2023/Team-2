using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public int? RouteId { get; set; }
        public Route Route { get; set; }
        public int? StoppointId { get; set; }
        public Stoppoint Stoppoint { get; set; }
        public int Sequence { get; set; }
        public DateTime ETA { get; set; }
        public DateTime ArrivalTime { get; set; }
        public DateTime LeaveTime { get; set;}
        public int Kg { get; set; }
    }
}
