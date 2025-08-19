"use client";
import { use, useEffect } from "react";
import socket from "../lib/socket";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
} | null;

export default function NotificationsListener({ user }: { user: User }) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!user) return;

    if (socket.connected) {
      socket.emit("join", { userId: user.id });
    } else {
      socket.on("connect", () => {
        console.log("🔌 Connected:", socket.id);
        socket.emit("join", { userId: user.id });
      });
    }

    // Log ALL events
    socket.onAny((event, ...args) => {
      console.log("📡 Got event:", event, args);
    });

    // Listen to our custom event
    socket.on("new_request", (data) => {
      if(user.id == data.receiverId){
        console.log("📨 New request for approval:", data);
        toast.success(`New request: ${data.content}`);
        queryClient.invalidateQueries({ queryKey: ["approvals"] });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected");
    });

    return () => {
      socket.off("new_request");
      socket.off("connect");
      socket.off("disconnect");
      socket.offAny();
    };
  }, [user, queryClient]);

  return null;
}
