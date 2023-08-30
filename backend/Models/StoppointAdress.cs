using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.Models
{
    public class StoppointAdress
    {
        public int Id { get; set; }
        public int StoppointId { get; set; }
        public Stoppoint Stoppoint { get; set; }
        public int? AdressId { get; set; }
        public Adress Adress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
