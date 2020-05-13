namespace UkazkaRazor.Models
{
    public class ChatMessage
    {
        public string msg { get; set; }

        public ChatMessage(string msg)
        {
            this.msg = msg;
        }
    }
}
