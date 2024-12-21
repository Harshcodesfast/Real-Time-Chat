("use client");
import { genRanHex, roomAtom } from "@/atoms/createRoomAtom";
import { messageAtom } from "@/atoms/messageAtom";
import { useridAtom } from "@/atoms/useridAtom";
import { usernameAtom } from "@/atoms/usernameAtom";
import { SendmessageIcon } from "@/components/icons/sendmessageIcon";
import { Input } from "@/components/ui/input";
import { TopBar } from "@/components/ui/topbar";
import { BACKEND_URL } from "@/config";
import { CopyIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export function ChatPage() {
  const [messages, setMessages] = useRecoilState(messageAtom);
  const roomid = useRecoilValue(roomAtom);
  const userid = useRecoilValue(useridAtom);
  const username = useRecoilValue(usernameAtom);
  let wssk: any = useRef();

  const formSchema = z.object({
    usermsg: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usermsg: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(wssk);
    wssk.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          username: username,
          message: values.usermsg,
          id: userid,
        },
      })
    );
  }

  useEffect(() => {
    const ws = new WebSocket(BACKEND_URL);
    console.log("connected");
    ws.onmessage = (e) => {
      setMessages((m) => [...m, JSON.parse(e.data)]);
    };

    wssk.current = ws;
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomid,
            id: userid,
            username: username,
          },
        })
      );
    };
    return () => {
      console.log("disconnected");
      ws.close();
    };
  }, []);

  return (
    <div className="h-screen">
      <TopBar />
      <div className="border  text-white flex justify-center m-3 p-2 rounded-md">
        Room ID :{roomid}
        <div
          className="pl-1"
          onClick={async () => {
            await navigator.clipboard.writeText(roomid);
          }}
        >
          <CopyIcon />
        </div>
      </div>
      <div className="flex flex-col h-5/6 p-4">
        <div className="flex-1 p-4 overflow-y-auto border border-md rounded-md">
          <div className={`mb-2 `}>
            {messages.map((msg) => (
              <div
                key={genRanHex(15)}
                className={`mb-2 ${
                  msg.id === userid ? "text-right" : "text-left"
                }`}
              >
                <div className="text-sm">{msg.username}</div>
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.id === userid
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex px-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full "
          >
            <div className="flex  items-center gap-4 ">
              <div className="w-11/12">
                <FormField
                  control={form.control}
                  name="usermsg"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Type a message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <Button size={"lg"} type="submit">
                  <SendmessageIcon />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
