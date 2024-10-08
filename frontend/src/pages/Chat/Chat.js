import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await axios.get(`http://localhost:5000/api/v1/history/${recipientId}`);
      setMessages(response.data.data);
    };
    fetchChatHistory();
  }, [recipientId]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/v1/send', { recipientId, message });
    setMessages([...messages, response.data.data]);
    setMessage('');
  };

  return (
    <div>
      <div className="chat-history">
        {messages.map((msg) => (
          <div key={msg._id} className={msg.sender === recipientId ? 'received' : 'sent'}>
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamps).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
