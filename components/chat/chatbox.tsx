"use client";
import { addMessageAtom, chatIDAtom, messagesAtom } from "@/atoms/chat";
import { MessageT } from "@/types/collections";
import { useAtom, useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import MobileMenuButton from "../navigation/mobile-menu-button";
import ChatInput from "./chat-input";
import Messages from "./messages";
import NewChat from "./new-chat";

const Chatbox = ({
  chatID,
  initialMessages,
}: {
  chatID?: string;
  initialMessages?: MessageT[];
}) => {
  const setCurrentChatID = useSetAtom(chatIDAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const addMessageHandler = useSetAtom(addMessageAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const writableParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );
  const isChatNew = writableParams.get("new") === "true";

  // Set the current chatID and initial messages when the component mounts
  useEffect(() => {
    setCurrentChatID(chatID!!);
    setMessages(initialMessages ?? []);
  }, [chatID, initialMessages, setCurrentChatID, setMessages]);

  // Send First Message if it's a new chat
  useEffect(() => {
    if (isChatNew && chatID) {
      console.log("Running Effect");
      addMessageHandler("generate").then(async () => {
        writableParams.delete("new");
        router.replace(`/chat/${chatID}`);
      });
    }
  }, [addMessageHandler, chatID, isChatNew, router, writableParams]);

  const isExistingChat = ((initialMessages && initialMessages.length > 0) ||
    messages.length > 0)!!;

  return (
    <div className="relative w-full h-screen ml-0 transition-all md:ml-64 dark:bg-neutral-900 bg-neutral-50">
      <MobileMenuButton />
      {isExistingChat ? <Messages /> : <NewChat />}
      <ChatInput chatID={chatID} isExistingChat={isExistingChat} />
    </div>
  );
};

export default Chatbox;