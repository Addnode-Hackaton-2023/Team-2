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
        public int? DriverId { get; set; }
        public Driver Driver { get; set; }
        public int? VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public ICollection<Destination> Destinations { get; set; }
        public int? EndStoppointId { get; set; }
        public Stoppoint EndStoppoint { get; set; }
        public DateTime Date { get; set; }
    }
}
