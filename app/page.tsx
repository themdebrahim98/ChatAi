import Image from "next/image";
import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main className=" bg-slate-800 min-h-screen min-w-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center mt-16 flex-1 ">
        <Chat />
      </div>
    </main>
  );
}
