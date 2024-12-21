"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./input";
import { useSetRecoilState } from "recoil";
import { genRanHex, roomAtom } from "@/atoms/createRoomAtom";
import { useNavigate } from "react-router-dom";
import { useridAtom } from "@/atoms/useridAtom";
import { usernameAtom } from "@/atoms/usernameAtom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  roomcode: z.string().length(6, {
    message: "Incorrect room Id",
  }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      roomcode: "",
    },
  });

  const navigate = useNavigate();
  const setId = useSetRecoilState(roomAtom);
  const setusername = useSetRecoilState(usernameAtom);
  const setUserid = useSetRecoilState(useridAtom);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setusername(values.username);
    setId(values.roomcode);
    setUserid(genRanHex(15));
    navigate("/chat");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room ID</FormLabel>
              <FormControl>
                <Input placeholder="Room ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button size={"lg"} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
