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
        public string Text { get; set; }
        public ICollection<StoppointAdress> StoppointAdresses { get; set; }
    }
}
