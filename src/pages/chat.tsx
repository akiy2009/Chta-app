import { useEffect, useState } from "react";
import { sendMessage, listenToMessages } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<{ uid: string } | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return listenToMessages(setMessages);
  }, []);

  const handleSend = async () => {
    if (input.trim() && user) {
      await sendMessage(user.uid, input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-grow overflow-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 border-b">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow p-2 border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          送信
        </button>
      </div>
    </div>
  );
}
