﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt.Models
{
    public class Driver
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public ICollection<Route> Routes { get; set; }
    }
}
