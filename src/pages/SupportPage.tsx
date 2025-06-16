
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import Chatbot from "@/components/support/Chatbot";

const faqs = [
  {
    question: "How do I change or cancel my booking?",
    answer: "You can change or cancel your booking through the 'Manage Booking' section on our website. Enter your booking reference and last name to access your reservation. Please note that fees may apply depending on your fare type and how close to departure you make changes."
  },
  {
    question: "What is the baggage allowance?",
    answer: "Baggage allowance varies depending on your ticket type and destination. For most economy flights, you're allowed one carry-on bag (max 7kg) and can purchase checked baggage. Business class typically includes 2 checked bags (23kg each). Check your booking confirmation for specific details."
  },
  {
    question: "How early should I arrive at the airport?",
    answer: "For domestic flights, we recommend arriving 90 minutes before departure. For international flights, please arrive 3 hours before departure to allow time for check-in, security screening, and immigration procedures."
  },
  {
    question: "Do I need a visa for my destination?",
    answer: "Visa requirements depend on your nationality and destination. It's your responsibility to ensure you have the necessary documentation. We recommend checking with the embassy or consulate of your destination country before traveling."
  }
];

const SupportPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("chat");
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/api/v1/aerovoyage/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send message.");

      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setSuccess("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-navy dark:text-white mb-4">Help & Support</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We're here to help with any questions or issues you might have with your booking.
              </p>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Us
                </TabsTrigger>
                <TabsTrigger value="faq">
                  <Mail className="mr-2 h-4 w-4" />
                  FAQs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Chat with our AI Assistant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isChatbotOpen && <Chatbot />}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-6">
                        <div className="flex items-center mb-4">
                          <Phone className="h-5 w-5 mr-3 text-accent" />
                          <h3 className="font-medium text-lg dark:text-white">Phone Support</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Our phone support is available 24/7:
                        </p>
                        <p className="font-medium text-lg dark:text-white">+1 (800) 123-4567</p>
                      </div>
                      
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-6">
                        <div className="flex items-center mb-4">
                          <Mail className="h-5 w-5 mr-3 text-accent" />
                          <h3 className="font-medium text-lg dark:text-white">Email Support</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          We typically respond within 24 hours:
                        </p>
                        <p className="font-medium text-lg dark:text-white">support@HJvoyages.com</p>
                      </div>
                    </div>
                    
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        <h3 className="font-medium text-lg dark:text-white">Send us a message</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                          name="name"
                          placeholder="Your name"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <Input
                          name="email"
                          placeholder="Email address"
                          type="email"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <Input
                        name="subject"
                        placeholder="Subject"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Sending..." : "Send message"}
                        </Button>
                      {success && <p className="text-sm text-center text-green-500 mt-2">{success}</p>}
                    </form>

                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-5 last:border-0">
                          <h3 className="font-medium text-lg mb-2 dark:text-white">{faq.question}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
