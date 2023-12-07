"use client";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useCompletion } from "ai/react";
import Image from "next/image";
import chatai from "@/public/chatai.png";
import Card from "./Card";
import { useChat } from "ai/react";
import BubbleMessage from "./BubbleMessage";
import { scrollToBottom } from "@/util/scroll";
import { errorNotify } from "@/util/alert";

export default function SloganGenerator() {
  const [prevChats, setprevChats] = useState<any>([]);
  const [currTitile, setCurrTitile] = useState<String>("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/completion",
      initialMessages: [
        { role: "assistant", content: "How can i help you ?", id: "#17#" },
      ],
      onError(error) {
        errorNotify(error.message);
      },
    });
  const containerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom(containerRef);
    }
  }, [messages]);

  return (
    <div className="px-8 py-5 flex flex-col  max-w-5xl w-full ring-slate-900 ring-1 rounded-md flex-1">
      <section
        id="chatBox"
        className=" min-h-[00px] flex gap-2 flex-col last-of-type: pb-36"
        ref={containerRef}
      >
        {messages.map((m, idx) => (
          <BubbleMessage content={m.content} role={m.role} key={idx} />
        ))}
      </section>

      <section
        id="bottomInput"
        className=" p-4 fixed bottom-1 left-5 right-5 flex justify-center mx-auto"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto max-w-4xl items-center "
        >
          <div className="flex items-stretch justify-center  rounded-sm overflow-hidden m-0">
            <textarea
              className="flex-1  text-left p-3 resize-none border-none rounded-l-full shadow-md py-4 px-4 dark:text-black focus:outline-none"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              rows={1}
            />
            <button
              disabled={isLoading}
              type="submit"
              className={`flex items-center w-[100px] justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none  ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              } ${
                isLoading && "disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {isLoading ? "Loading..." : "Send"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
