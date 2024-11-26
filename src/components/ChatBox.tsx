import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { MessageCircle, X, RefreshCw } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Draggable from "react-draggable";
import { useAuth } from "@/contexts/AuthContext";
import { Message, getRandomFact } from "@/types/chat";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    content: getRandomFact(),
    isUser: false,
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-completion", {
        body: { message: input },
      });

      if (error) {
        console.error('Supabase Edge Function error:', error);
        if (error.message.includes('429')) {
          throw new Error('Too many requests. Please wait a moment before trying again.');
        }
        throw error;
      }

      if (!data?.response) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response from chat service');
      }

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
      });
      
      // Remove the user's message if we couldn't get a response
      setMessages((prev) => prev.filter(msg => msg.id !== userMessage.id));
      setInput(userMessage.content); // Restore the user's input
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndChat = () => {
    setMessages([{
      id: crypto.randomUUID(),
      content: getRandomFact(),
      isUser: false,
      timestamp: new Date(),
    }]);
    setInput("");
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Draggable
      handle=".drag-handle"
      bounds="parent"
      defaultPosition={{ x: 0, y: 0 }}
      grid={[1, 1]}
      scale={1}
      defaultClassName="draggable-chatbox"
    >
      <div className="fixed right-4 bottom-4 w-96 z-50 transition-transform duration-75">
        <Card className="flex flex-col h-[600px] border-2 shadow-xl">
          <div className="p-4 border-b bg-primary text-primary-foreground drag-handle cursor-move flex justify-between items-center select-none">
            <h2 className="text-lg font-semibold">Insurance Assistant</h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEndChat}
                className="hover:bg-primary-foreground/20"
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20"
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>

          <ChatInput
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </Draggable>
  );
}