"use client";
import Login from "@/components/Login";
import { handleGetDataDefault, handleGetDataProtected } from "@/services";
import Image from "next/image";

export default function Home() {
  const handleGetFreeDate = async () => {
    const message = await handleGetDataDefault();
    if (message) alert(message);
    else alert("Error get free data");
  };

  const handleGetDataWithToken = async () => {
    const message = await handleGetDataProtected();
    if (message) alert(message);
    else alert("Error get data with token");
  };

  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between p-24">
      <div className="max-w-lg bg-white p-20">
        <Login />
      </div>
      <div className="w-2/4 bg-white p-10 flex justify-between items-center m-auto">
        <button
          onClick={handleGetFreeDate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Get Free Data
        </button>

        <button
          onClick={handleGetDataWithToken}
          className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Get Data With Token
        </button>
      </div>
    </main>
  );
}
