using Microsoft.AspNetCore.SignalR;
using UkazkaRazor.Services;
using UkazkaRazor.Models;
using System;
using System.Threading.Tasks;

namespace UkazkaRazor.SignalR
{
    public class ChatHub:Hub
    {
        private readonly IRoomStorage rooms;
        public ChatHub(IRoomStorage rooms)
        {
            this.rooms = rooms;
        }
        public void SendMove(string roomName, int firstPosition, int nextPosition,string color,bool kill,int diff,int count)
        {
            Clients.Group(roomName).SendAsync("attack", firstPosition, nextPosition, color,kill,Context.ConnectionId,diff,count);
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            Room tmp = null;
            foreach (var room in rooms.GetRooms())
            {
                foreach (var user in room.users)
                {
                    if (user == Context.ConnectionId)
                    {
                        tmp = room;
                        Clients.Group(room.roomName).SendAsync("PlayerLeave","hráč odešel / vypadl");
                    }
                }
            }
            if (tmp != null&&tmp.users.Count < 2)
            {
                tmp.users.Remove(Context.ConnectionId);
                Clients.All.SendAsync("CapacityUpdate", tmp.users.Count.ToString(), tmp.roomName);
            }
            return base.OnDisconnectedAsync(exception);
        }
        public void AddRoom(string roomName)
        {
            rooms.AddRoom(new Room(roomName));
            Clients.All.SendAsync("MessageReceived", roomName);
            Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }
        public void JoinRoom(string roomName)
        {
            Room tmp = null;
            bool checkUser = false;
            foreach (var item in rooms.GetRooms())
            {
                if (item.users.Contains(Context.ConnectionId))
                {
                    checkUser = true;
                }
            }
            foreach (var room in rooms.GetRooms())
            {
                if (room.roomName == roomName)
                {
                    if (room.users.Contains(Context.ConnectionId)==false&&checkUser == false)
                    {
                        Groups.AddToGroupAsync(Context.ConnectionId, roomName);
                        room.users.Add(Context.ConnectionId);
                        Clients.All.SendAsync("CapacityUpdate", room.users.Count.ToString(), room.roomName);
                    }
                    if (room.users.Count == 2)
                    {
                        tmp = room;
                        Clients.Group(room.roomName).SendAsync("Clear", roomName, room.users[0],room.users[1]);
                    }
                }
            }
            if (tmp != null)
            {
                //rooms.RemoveRoom(tmp);
            }
        }
        public void SendMessage(string msg)
        {
            rooms.AddMessage(new ChatMessage(msg));
            Clients.All.SendAsync("UpdateChat",msg);
        }
    }
}
