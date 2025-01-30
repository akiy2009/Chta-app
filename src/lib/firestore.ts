import { db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// チャットメッセージを送信
export const sendMessage = async (userId: string, text: string) => {
  try {
    await addDoc(collection(db, "messages"), {
      userId,
      text,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("メッセージ送信エラー:", error);
  }
};

// メッセージをリアルタイムで取得
export const listenToMessages = (callback: Function) => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};
