using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UkazkaRazor.Models;

namespace UkazkaRazor.Services
{
    public class RoomStorage : IRoomStorage
    {
        List<Room> rooms = new List<Room>() 
        { 
            new Room("Test")
        };
        List<ChatMessage> messages = new List<ChatMessage>()
        {
            new ChatMessage("fgt")
        };
        public void AddRoom(Room room)
        {
            rooms.Add(room);
        }
        public void RemoveRoom(Room room)
        {
            rooms.Remove(room);
        }
        public IEnumerable<Room> GetRooms()
        {
            return rooms;
        }
        public void AddMessage(ChatMessage msg)
        {
            messages.Add(msg);
        }
        public IEnumerable<ChatMessage> GetMessages()
        {
            return messages;
        }
    }
    public interface IRoomStorage
    {
        IEnumerable<Room> GetRooms();
        void AddRoom(Room room);
        void RemoveRoom(Room room);
        void AddMessage(ChatMessage msg);
        IEnumerable<ChatMessage> GetMessages();
    }
}
