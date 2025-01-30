import { signInWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button 
        onClick={signInWithGoogle}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Googleでログイン
      </button>
    </div>
  );
}
