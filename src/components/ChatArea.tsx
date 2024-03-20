import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello, how can I help you?", sender: "bot", timestamp: "10:00 AM" },
    { id: 2, text: "I have a question about your service.", sender: "user", timestamp: "10:01 AM" },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageObj: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full max-w-4xl h-full max-h-[80vh] my-4 p-4 border rounded-lg shadow-lg bg-white flex flex-col">
        <div className="flex-grow overflow-auto custom-scrollbar pr-4"> {/* Add padding to the right */}
          <div className="space-y-2 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-lg break-words ${message.sender === 'bot' ? 'bg-blue-950 text-white' : 'bg-green-500 text-white'}`}>
                      <p>{message.text}</p>
                      <p className="text-xs opacity-75 mt-2 text-white">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          <div ref={messagesEndRef} /> {/* Invisible div for scrolling reference */}
        </div>
        <form onSubmit={handleSendMessage} className="flex mt-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
