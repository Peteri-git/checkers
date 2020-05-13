using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UkazkaRazor.Models
{
    public class Item
    {
        [MaxLength(10)]
        public string Value { get; set; }
        public int Index { get; set; }
    }
}
