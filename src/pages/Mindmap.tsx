
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Plus, Minus, DownloadCloud } from "lucide-react";

// Node interface for mindmap
interface MindMapNode {
  id: string;
  label: string;
  children: MindMapNode[];
  expanded?: boolean;
}

const Mindmap = () => {
  // Sample mindmap data
  const initialMindMap: MindMapNode = {
    id: "root",
    label: "Neural Networks",
    expanded: true,
    children: [
      {
        id: "structure",
        label: "Structure",
        expanded: true,
        children: [
          {
            id: "input-layer",
            label: "Input Layer",
            children: [],
          },
          {
            id: "hidden-layers",
            label: "Hidden Layers",
            children: [],
          },
          {
            id: "output-layer",
            label: "Output Layer",
            children: [],
          },
        ],
      },
      {
        id: "types",
        label: "Types",
        expanded: true,
        children: [
          {
            id: "cnn",
            label: "Convolutional Neural Networks (CNN)",
            children: [
              {
                id: "cnn-applications",
                label: "Applications",
                children: [
                  {
                    id: "image-recognition",
                    label: "Image Recognition",
                    children: [],
                  },
                  {
                    id: "face-detection",
                    label: "Face Detection",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "rnn",
            label: "Recurrent Neural Networks (RNN)",
            children: [
              {
                id: "rnn-applications",
                label: "Applications",
                children: [
                  {
                    id: "nlp",
                    label: "Natural Language Processing",
                    children: [],
                  },
                  {
                    id: "time-series",
                    label: "Time Series Analysis",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "training",
        label: "Training",
        expanded: true,
        children: [
          {
            id: "backpropagation",
            label: "Backpropagation",
            children: [],
          },
          {
            id: "gradient-descent",
            label: "Gradient Descent",
            children: [],
          },
          {
            id: "optimization",
            label: "Optimization Algorithms",
            expanded: false,
            children: [
              {
                id: "adam",
                label: "Adam",
                children: [],
              },
              {
                id: "rmsprop",
                label: "RMSprop",
                children: [],
              },
              {
                id: "sgd",
                label: "Stochastic Gradient Descent",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };

  const [mindMap, setMindMap] = useState<MindMapNode>(initialMindMap);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Function to toggle node expansion
  const toggleNode = (nodeId: string, nodes: MindMapNode = mindMap): MindMapNode => {
    if (nodes.id === nodeId) {
      return { ...nodes, expanded: !nodes.expanded };
    }
    
    if (nodes.children) {
      return {
        ...nodes,
        children: nodes.children.map((child) => toggleNode(nodeId, child)),
      };
    }
    
    return nodes;
  };

  // Handle node click to expand/collapse
  const handleNodeClick = (nodeId: string) => {
    setMindMap(toggleNode(nodeId));
  };

  // Recursive function to render nodes
  const renderNode = (node: MindMapNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.expanded !== false;
    
    return (
      <div key={node.id} className="mindmap-node">
        <div 
          className={`flex items-center py-1 pl-${level * 4} cursor-pointer hover:bg-secondary rounded transition-colors`}
          onClick={() => handleNodeClick(node.id)}
        >
          {hasChildren && (
            <div className="w-5 h-5 flex items-center justify-center mr-1">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          )}
          {!hasChildren && <div className="w-5 mr-1" />}
          <span>{node.label}</span>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="pl-4">
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Mind Map</h1>
        <p className="text-muted-foreground">
          Visualize concepts and their relationships
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-64 flex flex-col gap-4">
          <Card>
            <CardHeader className="py-4 px-4">
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="py-2 space-y-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center text-sm">
                  {Math.round(zoomLevel * 100)}%
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <DownloadCloud className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4 px-4">
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <span>Main Concept</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span>Primary Branch</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <span>Secondary Branch</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                  <span>Tertiary Branch</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card className="h-[calc(100vh-200px)] overflow-auto">
            <CardHeader className="py-4 px-6 border-b">
              <CardTitle>Neural Networks Mind Map</CardTitle>
              <CardDescription>Explore the concepts and relationships</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className="mindmap-container"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              >
                {renderNode(mindMap)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mindmap;
