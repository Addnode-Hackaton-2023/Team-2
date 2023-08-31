using Flyt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.DTO
{
    public class AdressGetDTO
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public City City { get; set; }
        public string CityName { get { return Enum.GetName(typeof(City), City).ToUpper(); } }
        public Muncipality Muncipality { get; set; }
        public string MuncipalityName { get { return Enum.GetName(typeof(Muncipality), Muncipality).ToUpper(); } }
        public int ZipCode { get; set; }
    }
}
