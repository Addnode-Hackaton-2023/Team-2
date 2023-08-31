using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.Models
{
    public class Adress
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public City City { get; set; }
        public Muncipality Muncipality { get; set; }
        public int ZipCode { get; set; }
        public ICollection<StoppointAdress> StoppointAdresses { get; set; }
    }
}
