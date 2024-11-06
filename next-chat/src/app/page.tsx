"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function Home() {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [message, setMessage] = useState("");
  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("7ca408a21e8f1e15fc50", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data: any) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, message }),
    });

    setMessage("");
  };

  return (
    <div className="container ml-3">
      <div className="flex flex-col items-stretch flex-shrink-0 bg-white">
        <div className="flex items-center shrink-0 p-3 text-gray-800 no-underline border-b">
          <input
            className="text-lg font-semibold pl-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="list-none text-black divide-y border-b overflow-auto min-h-[500px]">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className="block cursor-pointer py-3 leading-tight"
              >
                <div className="flex w-full items-center justify-between">
                  <strong className="mb-1">{message.username}</strong>
                </div>
                <div className="w-10/12 mb-1 text-sm">{message.message}</div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={submit}>
        <input
          className="block pl-1 w-full text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
