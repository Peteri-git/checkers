using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UkazkaRazor.Models;

namespace UkazkaRazor.Services
{
    public class MessageStorage:IMessageStorage
    {
        public List<ChatMessage> messages = new List<ChatMessage>();
        public IEnumerable<ChatMessage> GetMessages()
        {
            return messages;
        }

        public void AddMessage(ChatMessage message)
        {
            messages.Add(message);
        }
    }
    public interface IMessageStorage
    {
        IEnumerable<ChatMessage> GetMessages();
        void AddMessage(ChatMessage message);
    }
}
