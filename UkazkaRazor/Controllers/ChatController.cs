using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UkazkaRazor.Models;
using UkazkaRazor.Services;
using UkazkaRazor.SignalR;

namespace UkazkaRazor.Controllers
{
    public class ChatController:Controller
    {
        //private readonly IMessageStorage messageStorage;
        private readonly IRoomStorage rooms;

        public ChatController(IRoomStorage rooms)
        {
            //this.messageStorage = messageStorage;
            this.rooms = rooms;
        }
        public IActionResult Index()
        {
            ViewBag.Chat = rooms.GetMessages();
            ViewBag.rooms = rooms.GetRooms();
            return View(rooms.GetRooms());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddRoom([FromServices] IHubContext<ChatHub> context, string name)
        {
            context.Clients.All.SendAsync("MessageReceived", name);
            rooms.AddRoom(new Room() { roomName = name});
            return RedirectToAction("Index");
        }
    }
}
