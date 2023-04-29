import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, how's it going?",
      sender: "me",
    },
    {
      id: 2,
      text: "Not bad, thanks for asking. How about you?",
      sender: "them",
    },
    {
      id: 3,
      text: "I'm doing pretty well too, thanks!",
      sender: "me",
    },
  ]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: message,
        sender: "me",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/3 px-6 py-8 bg-white border-r border-gray-300">
        <h1 className="mb-6 text-xl font-bold">Chat</h1>
        <ul>
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`mb-4 ${
                msg.sender === "me" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                {msg.text}
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleMessageSubmit}>
          <div className="flex items-center mt-8">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full px-4 py-2 mr-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
