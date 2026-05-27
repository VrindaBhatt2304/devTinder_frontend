import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  const time = new Date(timestamp);
  return `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = (chat?.data?.messages || []).map((msg) => ({
        senderId: msg?.senderId?._id || "",
        firstName: msg?.senderId?.firstName || "",
        lastName: msg?.senderId?.lastName || "",
        text: msg?.text || "",
        timestamp: formatTimestamp(msg?.createdAt),
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to load chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinRoom", {
      userId,
      targetUserId,
    });

    socket.on("joinedRoom", ({ success }) => {
      if (success) {
        console.log("Successfully joined chat room");
      }
    });

    socket.on(
      "received Message",
      ({ senderId, firstName, lastName, text, timestamp }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: senderId || "",
            firstName: firstName || "",
            lastName: lastName || "",
            text: text || "",
            timestamp: formatTimestamp(timestamp),
          },
        ]);
      }
    );

    socket.on("error", ({ message }) => {
      console.error("Socket error:", message);
      alert(message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, user?.firstName, user?.lastName]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  return (
    <div className="my-10 mx-auto flex flex-col border-2 border-gray-300 rounded-lg w-1/2 h-[70vh] bg-neutral-100">
      <div className="w-full flex mb-4 border-b-2 border-gray-300 p-4">
        <h1 className="text-bold text-2xl">Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => {
          const bubbleClass = msg.senderId === userId ? "chat chat-end" : "chat chat-start";
          return (
            <div key={index} className={`${bubbleClass} p-2`}>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`.trim()}
                <time className="text-xs opacity-50">{msg.timestamp}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          );
        })}
      </div>
      <div className="border-t-2 border-gray-300">
        <div className="flex flex-row items-center w-full">
          <input
            type="text"
            placeholder="Type your message here..."
            className="border-2 border-gray-300 rounded-lg p-2 w-full m-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="btn btn-black bg-green-700 text-white p-4 m-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
