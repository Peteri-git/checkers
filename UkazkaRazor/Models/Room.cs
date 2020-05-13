using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UkazkaRazor.Models
{
    public class Room
    {
        public string roomName { get; set; }
        public List<string> users { get; set; } = new List<string>();
        public Room(string roomName)
        {
            this.roomName = roomName;
        }
        public Room()
        {

        }
    }
}
