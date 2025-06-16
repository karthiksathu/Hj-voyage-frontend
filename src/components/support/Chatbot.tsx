
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting based on language
  useEffect(() => {
    const greetings: Record<string, string> = {
      en: "Hello! How can I help you with your flight booking today?",
      hi: "नमस्ते! मैं आज आपकी उड़ान बुकिंग में कैसे मदद कर सकता हूं?",
      ur: "ہیلو! میں آج آپ کی پرواز کی بکنگ میں کیسے مدد کر سکتا ہوں؟",
      te: "హలో! నేను ఈరోజు మీ విమానం బుకింగ్లో ఎలా సహాయం చేయగలను?",
    };
    
    // Get default greeting or fall back to English
    const greeting = greetings[language] || greetings.en;
    
    // Add initial bot message
    setMessages([{
      id: 1,
      text: greeting,
      sender: "bot",
      timestamp: new Date(),
    }]);
  }, [language]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot response based on keywords
    setTimeout(() => {
      let responseText = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("cancel") || lowerInput.includes("refund")) {
        responseText = "To cancel your booking or request a refund, please go to the 'Manage Bookings' section and enter your booking details. Depending on your fare type, fees may apply.";
      } else if (lowerInput.includes("baggage") || lowerInput.includes("luggage")) {
        responseText = "Baggage allowance varies based on your ticket type and destination. Economy tickets typically include one carry-on (7kg) with options to purchase checked baggage. Business class usually includes 2 checked bags (23kg each).";
      } else if (lowerInput.includes("check-in")) {
        responseText = "Online check-in opens 48 hours before departure and closes 1 hour before the flight. You can check in through our website or mobile app.";
      } else if (lowerInput.includes("change") || lowerInput.includes("reschedule")) {
        responseText = "To change your flight, go to the 'Manage Bookings' section on our website. Change fees may apply depending on your fare type.";
      } else {
        responseText = "Thank you for your message. For specific information about your booking, please visit the 'Manage Bookings' section or contact our customer support team.";
      }
      
      const botMessage: Message = {
        id: Date.now(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                message.sender === "user" ? "bg-accent ml-2" : "bg-gray-200 dark:bg-gray-700"
              }`}>
                {message.sender === "user" ? 
                  <User className="h-4 w-4 text-white" /> : 
                  <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                }
              </div>
              <div className={`rounded-2xl px-4 py-2 ${
                message.sender === "user" 
                  ? "bg-accent text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
