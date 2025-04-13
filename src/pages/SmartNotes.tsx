
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Download, Printer, Share2, BookmarkPlus } from "lucide-react";

const SmartNotes = () => {
  // Mock data for smart notes
  const notes = {
    title: "Introduction to Neural Networks",
    summary: "Neural networks are computing systems inspired by the biological neural networks in animal brains. They are the foundation of many modern AI systems and can learn to perform tasks by analyzing examples.",
    keyPoints: [
      "Neural networks consist of artificial neurons organized in layers",
      "Deep learning uses neural networks with many hidden layers",
      "Training involves adjusting weights through backpropagation",
      "Activation functions introduce non-linearity into the model",
      "Common applications include image recognition and natural language processing"
    ],
    sections: [
      {
        title: "Basic Structure",
        content: "Neural networks consist of interconnected nodes or 'neurons' organized in layers. The typical structure includes an input layer, one or more hidden layers, and an output layer. Each connection between neurons has a weight that determines the influence of one neuron on another."
      },
      {
        title: "Learning Process",
        content: "Neural networks learn through a process called backpropagation. During training, the network makes predictions, compares them to the expected outputs, and adjusts the connection weights to minimize the error. This process is repeated many times with different examples from the training data."
      },
      {
        title: "Activation Functions",
        content: "Activation functions introduce non-linearity into the model, allowing neural networks to learn complex patterns. Common activation functions include ReLU (Rectified Linear Unit), sigmoid, and tanh. The choice of activation function impacts the network's ability to learn and its performance."
      },
      {
        title: "Types of Neural Networks",
        content: "There are various types of neural networks designed for different tasks. Convolutional Neural Networks (CNNs) excel at image processing, while Recurrent Neural Networks (RNNs) and Long Short-Term Memory networks (LSTMs) are suited for sequential data like text or time series."
      }
    ]
  };

  return (
    <div className="container mx-auto max-w-4xl fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{notes.title}</h1>
        <p className="text-muted-foreground">
          AI-generated notes to help you understand the material
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <Tabs defaultValue="notes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notes">Smart Notes</TabsTrigger>
          <TabsTrigger value="key-points">Key Points</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="prose max-w-none">
                <p className="text-lg font-medium">{notes.summary}</p>
                <Separator className="my-4" />
                
                {notes.sections.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="key-points">
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {notes.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <p>{point}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">{notes.summary}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartNotes;
