
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, FileText, MessageSquare, FileQuestion, SquareStack, Network, Trash2 } from "lucide-react";

// Sample history data
const historyData = [
  {
    id: 1,
    title: "Introduction to Neural Networks",
    type: "chat",
    date: "2023-04-12T14:30:00Z",
    preview: "I asked about the basics of neural networks and how they work...",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    type: "notes",
    date: "2023-04-10T09:15:00Z",
    preview: "Smart notes on supervised vs unsupervised learning...",
  },
  {
    id: 3,
    title: "Deep Learning Quiz",
    type: "quiz",
    date: "2023-04-08T16:45:00Z",
    preview: "Scored 85% on the deep learning concepts quiz...",
  },
  {
    id: 4,
    title: "Convolutional Neural Networks",
    type: "flashcards",
    date: "2023-04-05T11:20:00Z",
    preview: "Reviewed 24 flashcards about CNN architecture...",
  },
  {
    id: 5,
    title: "AI Algorithms Overview",
    type: "mindmap",
    date: "2023-04-03T13:10:00Z",
    preview: "Created a mind map of different AI algorithms and their applications...",
  },
  {
    id: 6,
    title: "Natural Language Processing",
    type: "chat",
    date: "2023-04-01T10:30:00Z",
    preview: "Discussion about tokenization and embeddings in NLP...",
  },
  {
    id: 7,
    title: "Reinforcement Learning Basics",
    type: "notes",
    date: "2023-03-28T15:45:00Z",
    preview: "Smart notes covering Q-learning and policy gradients...",
  },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "notes":
        return <FileText className="h-5 w-5" />;
      case "chat":
        return <MessageSquare className="h-5 w-5" />;
      case "quiz":
        return <FileQuestion className="h-5 w-5" />;
      case "flashcards":
        return <SquareStack className="h-5 w-5" />;
      case "mindmap":
        return <Network className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  // Filter and search history items
  const filteredHistory = historyData
    .filter((item) => 
      (filterType === "all" || item.type === filterType) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.preview.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto max-w-4xl fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Learning History</h1>
        <p className="text-muted-foreground">
          Review your past learning activities and sessions
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search your history..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={filterType}
          onValueChange={setFilterType}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="notes">Smart Notes</SelectItem>
            <SelectItem value="chat">Chat Sessions</SelectItem>
            <SelectItem value="quiz">Quizzes</SelectItem>
            <SelectItem value="flashcards">Flashcards</SelectItem>
            <SelectItem value="mindmap">Mind Maps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length > 0 ? (
            <div className="space-y-1">
              {filteredHistory.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 py-3 hover:bg-secondary/50 rounded-md px-2 transition-colors cursor-pointer">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      {getActivityIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium truncate">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.preview}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                    </Button>
                  </div>
                  {index < filteredHistory.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No history items found.</p>
              {searchQuery && (
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
