using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UkazkaRazor.Models
{
    public class Checkers
    {
        public int[,] Board { get; set; } = new int[8, 8] { 
            { 1, 0, 1, 0, 1, 0, 1, 0 }, 
            { 0, 1, 0, 1, 0, 1, 0, 1 }, 
            { 1, 0, 1, 0, 1, 0, 1, 0 }, 
            { 0, 0, 0, 0, 0, 0, 0, 0 }, 
            { 0, 0, 0, 0, 0, 0, 0, 0 }, 
            { 0, 1, 0, 1, 0, 1, 0, 1 }, 
            { 1, 0, 1, 0, 1, 0, 1, 0 },
            { 0, 1, 0, 1, 0, 1, 0, 1 }
        };
        public Checkers()
        {

        }
        public void SendMove()
        {

        }
    }
}
