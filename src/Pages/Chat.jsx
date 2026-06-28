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
      },
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
    <div className="my-6 mx-auto flex flex-col border border-slate-800/60 rounded-2xl w-full max-w-2xl h-[75vh] bg-slate-950/80 backdrop-blur-md shadow-2xl overflow-hidden group">
      <div className="w-full flex items-center justify-between border-b border-slate-800/80 p-4 bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <h1 className="font-extrabold text-xl text-white tracking-tight">
            Chat Room
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => {
            const isMe = msg.senderId === userId;
            const bubbleClass = isMe ? "chat chat-end" : "chat chat-start";

            return (
              <div
                key={index}
                className={`${bubbleClass} transition-all duration-200`}
              >
                {/* Sender Metadata details */}
                <div className="chat-header text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                  <span
                    className={
                      isMe
                        ? "text-violet-400 font-semibold"
                        : "text-slate-300 font-semibold"
                    }
                  >
                    {isMe ? "You" : `${msg.firstName} ${msg.lastName}`.trim()}
                  </span>
                  <time className="text-[10px] opacity-40">
                    {msg.timestamp || "Just now"}
                  </time>
                </div>

                <div
                  className={`chat-bubble max-w-xs md:max-w-md text-sm font-medium rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                    isMe
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-tr-none"
                      : "bg-slate-800 text-slate-100 border border-slate-700/50 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6 space-y-2">
            <div className="text-3xl">💬</div>
            <p className="text-sm italic">
              No messages yet. Send a ping to start the discussion!
            </p>
          </div>
        )}
      </div>

      <div className="p-3 bg-slate-900/40 border-t border-slate-800/80">
        <div className="flex flex-row items-center w-full gap-2">
          <input
            type="text"
            placeholder="Write code or type your message here..."
            className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 w-full text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-violet-600/10 active:scale-95 flex items-center gap-1.5 h-auto self-stretch"
            onClick={sendMessage}
          >
            <span>Send</span>
            <span className="text-xs opacity-70">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
