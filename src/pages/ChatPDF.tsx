
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Send, User } from "lucide-react";

const ChatPDF = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! I'm your AI study assistant. You can ask me questions about the document you've uploaded." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sample PDF content summary
  const summary = {
    title: "Introduction to Neural Networks",
    keyPoints: [
      "Neural networks are computing systems inspired by biological neural networks",
      "They consist of artificial neurons organized in layers",
      "Deep learning uses neural networks with many hidden layers",
      "Training involves adjusting weights through backpropagation",
      "Applications include image recognition and natural language processing"
    ],
    chapters: [
      { title: "Chapter 1: Basic Structure", pages: "1-15" },
      { title: "Chapter 2: Learning Process", pages: "16-32" },
      { title: "Chapter 3: Activation Functions", pages: "33-47" },
      { title: "Chapter 4: Types of Neural Networks", pages: "48-65" }
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "system",
        content: `Based on the document, neural networks are computing systems inspired by biological neural networks found in animal brains. They consist of artificial neurons organized in layers, typically including an input layer, hidden layers, and an output layer. Each connection between neurons has a weight that determines the influence of one neuron on another.`
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-6xl p-1 md:p-1 fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chat with PDF</h1>
        <p className="text-muted-foreground">
          Ask questions about your document and get instant answers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <CardTitle className="text-lg font-medium">Document Chat</CardTitle>
              <CardDescription>
                Ask questions about "Introduction to Neural Networks.pdf"
              </CardDescription>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 mb-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role !== "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <BookOpen className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-muted-foreground text-background">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <BookOpen className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Ask a question about the document..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="px-4 py-3 border-b">
              <CardTitle className="text-lg font-medium">Document Overview</CardTitle>
            </CardHeader>
            <Tabs defaultValue="summary">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="p-4">
                <h3 className="font-semibold mb-2">{summary.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Key Points:</p>
                <ul className="space-y-2 text-sm">
                  {summary.keyPoints.map((point, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="structure" className="p-4">
                <p className="text-sm text-muted-foreground mb-4">Document Structure:</p>
                <ul className="space-y-3 text-sm">
                  {summary.chapters.map((chapter, index) => (
                    <li key={index} className="pb-2 border-b border-border last:border-0 last:pb-0">
                      <p className="font-medium">{chapter.title}</p>
                      <p className="text-muted-foreground text-xs">Pages: {chapter.pages}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPDF;
