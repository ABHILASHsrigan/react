import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "../../hooks/useAuthState";
import './ChatWindow.css';

export default function ChatWindow() {
  const sel = useSelector((s) => s.chat.selectedUser);
  const { user } = useAuthState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Determine shared chatId for both users
  const chatId = user && sel ? [user.uid, sel.uid].sort().join("_") : null;

  // Update lastSeen when opening chat and every 30 seconds while in chat
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const updateLastSeen = async () => {
      await updateDoc(userRef, { lastSeen: serverTimestamp() });
    };

    updateLastSeen(); // initial update
    const interval = setInterval(updateLastSeen, 30000);

    return () => clearInterval(interval);
  }, [user]);

  // Fetch messages in real-time
  useEffect(() => {
    if (!chatId) return;

    const q = query(collection(db, "messages", chatId, "chat"), orderBy("timestamp"));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
    });

    return () => unsub();
  }, [chatId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update lastSeen on typing
  const handleTyping = () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, { lastSeen: serverTimestamp() }).catch(console.error);
  };

  // Send a new message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    try {
      // Add message to chat
      await addDoc(collection(db, "messages", chatId, "chat"), {
        senderId: user.uid,
        text: newMessage.trim(),
        timestamp: serverTimestamp(),
      });

      // Update lastSeen immediately
      await updateDoc(doc(db, "users", user.uid), { lastSeen: serverTimestamp() });

      setNewMessage(""); // clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!sel) return <div className="chat-window">Select a user to chat</div>;

  return (
    <div className="chat-window">
      <h3>Chat with {sel.displayName || sel.email}</h3>

      <div className="messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`message ${m.senderId === user.uid ? "sent" : "received"}`}
          >
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-form" onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

