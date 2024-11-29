import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["You are connected", "hello"]);
  const wsRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (e) => {
      setMessages((m) => [...m, e.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "123",
          },
        })
      );
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <div className="bg-black h-screen  ">
        <br />
        <br />
        <br />
        <div className=" h-[85vh] ">
          {messages.map((message) => (
            <div className="m-8">
              <span className="bg-white p-4 ">{message}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-white flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here"
            className="flex-1 p-4"
          />
          <button
            onClick={() => {
              const message = inputRef.current?.value;
              wsRef.current?.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );
            }}
            className="bg-purple-900"
          >
            send message
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
