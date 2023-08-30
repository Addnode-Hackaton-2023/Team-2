using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.Models
{
    public class Stoppoint
    {
        public int Id { get; set; }
        public Brand Brand { get; set; }
        public bool IsRecipient { get; set; }
    }
}
