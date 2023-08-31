using Flyt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.DTO
{
    public class StoppointGetDTO
    {
        public int Id { get; set; }
        public AdressGetDTO Adress { get; set; }
        public BrandGetDTO Brand { get; set; }
        public bool IsRecipient { get; set; }
    }
}
