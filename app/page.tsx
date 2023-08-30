import Login from "@/components/Login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between p-24">
      <div className="max-w-lg bg-white p-20">
        <Login />
      </div>
    </main>
  );
}
