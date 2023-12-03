"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCompletion } from "ai/react";
import Image from 'next/image'
import chatai from '@/public/chatai.png'
import Card from "./Card";
export default function SloganGenerator() {
  const [prevChats, setprevChats] = useState<any>([]);
  const [currTitile, setCurrTitile] = useState<String>("");

  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    setCompletion,
  } = useCompletion({
    api: "/api/completion",
    onFinish: (prompt, completion) => {
      succsessNotify();
      setInput("");
      !currTitile && setCurrTitile(input);
      setprevChats((prev: any) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: completion },
      ]);
    },

    onError: (err: Error) => {
      errorNotify(err.message);
    },
    body: {
      chatHistory: prevChats,
    },
  });
  const succsessNotify = () =>
    toast.success("Successfully Completed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const errorNotify = (err: string) =>
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });


  return (
    <div className=" max-w-4xl px-8  py-5 flex flex-col ">
      <div>
        <ToastContainer />
      </div>

      {/* {prevChats.map((chat: any) => <li>{chat.role} {chat.content}</li>)} */}

      <div className="mx-auto w-full max-w-2xl py-24 flex flex-col overflow-x-auto bg-gray-200  text-left  flex-1 p-2 shadow-md">
        {prevChats.length > 0 &&
          prevChats.map(
            (chat: any, idx: number) =>
              idx != prevChats.length - 1 && (
                <div className=" rounded-md overflow-auto my-4 text-left bg-black/80 p-5 text-white" key={idx}>
                  <span className="font-bold text-xl text-orange-400">
                    {chat.role == "assistant" ? "ChatAi" : "You"} :{" "}
                  </span>

                  <br />
                  {chat.content}
                </div>
              )
          )}

        {completion && (
          <div className=" rounded-md whitespace-pre-wrap my-4 text-left bg-black/80 p-5 text-white overflow-auto flex-wrap ">
            <span className="font-bold text-xl text-orange-400">
              {"ChatAi"}:{" "}
            </span>
            <br />
            {completion}
          </div>
        )}

        {!currTitile && !completion && (

          <>
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/chatai.png"
                width={70}
                height={70}
                alt="Picture of the author"
                className="mb-5"
              />
              <h1 className="text-4xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text shadow-lg rounded-full p-4">
                  CHAT AI
                </span>
              </h1>

            </div>
            <div className=" grid grid-cols-2 gap-3">
              <Card title="Your Virtual Assistant" subtitle="IInteract like a human, ask a question, and get an answer!" />
              <Card title="Paste Passage / Information" subtitle='You can ask any question based on provided information' />
              <Card title=" Math, English, Any Idea" subtitle='Get solution' />
              <Card title=" Solve Any Coding" subtitle='Get immidiate answer' />

            </div>
          </>





        )}
      </div>
      <section className="fixed bottom-5 left-5 right-5 flex justify-center mx-auto">
        <form onSubmit={handleSubmit} className="w-full mx-auto max-w-4xl ">
          <div className="flex items-stretch border border-gray-300 rounded-full overflow-hidden shadow-2xl ring-2 mb-11">
            <textarea
              className="flex-1 text-left p-3 resize-none border-none rounded-l-full shadow-md py-2 px-4 dark:text-black focus:outline-none"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button
              disabled={isLoading}
              type="submit"
              className={`flex items-center w-[100px] justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none  ${isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
                } ${isLoading && "disabled:opacity-50 disabled:cursor-not-allowed"
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
