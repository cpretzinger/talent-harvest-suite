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
    if (!input.trim()) return;

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
      console.log('Sending chat request to Edge Function...');
      const { data, error } = await supabase.functions.invoke("chat-completion", {
        body: { message: input },
      });

      console.log('Response from Edge Function:', { data, error });

      if (error) {
        console.error('Supabase Edge Function error:', error);
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
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response. Please try again.",
      });
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
    setIsLoading(false); // Reset loading state to ensure input isn't disabled
    toast({
      title: "Chat Reset",
      description: "The chat has been reset with a new insurance fact.",
    });
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
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20"
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