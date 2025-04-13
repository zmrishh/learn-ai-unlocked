
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronDown, ChevronRight, Plus, Minus, DownloadCloud, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Node interface for mindmap
interface MindMapNode {
  id: string;
  label: string;
  children: MindMapNode[];
  expanded?: boolean;
  type?: 'main' | 'primary' | 'secondary' | 'tertiary';
}

const Mindmap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const materialTitle = "Neural Networks";
  const materialSource = "Neural_Networks.pdf";

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
  const [viewMode, setViewMode] = useState<'mindmap' | 'flowchart'>('mindmap');

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

  const handleUploadNew = () => {
    navigate("/upload");
  };

  // Recursive function to render nodes in mindmap style
  const renderMindmapNode = (node: MindMapNode, level: number = 0) => {
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
            {node.children.map((child) => renderMindmapNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Recursive function to render nodes in flowchart style
  const renderFlowchartNode = (node: MindMapNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.expanded !== false;

    // Determine node style based on level
    let nodeStyle = "";
    let connectStyle = "";

    switch (level) {
      case 0:
        nodeStyle = "bg-primary text-primary-foreground";
        connectStyle = "border-primary";
        break;
      case 1:
        nodeStyle = "bg-blue-500 text-white";
        connectStyle = "border-blue-500";
        break;
      case 2:
        nodeStyle = "bg-green-500 text-white";
        connectStyle = "border-green-500";
        break;
      default:
        nodeStyle = "bg-yellow-500 text-white";
    }

    return (
      <div key={node.id} className="relative">
        <div className="flex mb-4">
          <div
            className={`px-4 py-2 rounded-md ${nodeStyle} cursor-pointer`}
            onClick={() => handleNodeClick(node.id)}
          >
            {node.label}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-8 pl-4 border-l-2 border-dashed">
            {node.children.map((child) => (
              <div key={child.id} className="relative">
                <div className={`absolute -left-4 top-3 w-4 border-t-2 border-dashed ${connectStyle}`}></div>
                {renderFlowchartNode(child, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mind Map</h1>
          <p className="text-muted-foreground">
            Visualize concepts and their relationships
          </p>
        </div>
        <div className="flex items-center">
          <Badge variant="outline" className="mr-3 py-1.5 px-3 bg-purple-50 border-purple-200 text-purple-700 hidden sm:flex">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            {materialTitle}
          </Badge>
          <Button variant="outline" size="sm" onClick={handleUploadNew}>
            <Upload className="h-4 w-4 mr-2" />
            New Material
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-64 flex flex-col gap-4">
          <Card>
            <CardHeader className="py-4 px-4">
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="py-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={viewMode === 'mindmap' ? 'bg-secondary' : ''}
                  onClick={() => setViewMode('mindmap')}
                >
                  Mind Map
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={viewMode === 'flowchart' ? 'bg-secondary' : ''}
                  onClick={() => setViewMode('flowchart')}
                >
                  Flowchart
                </Button>
              </div>

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
              <CardDescription>Exploring concepts from {materialSource}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className="mindmap-container"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              >
                {viewMode === 'mindmap'
                  ? renderMindmapNode(mindMap)
                  : renderFlowchartNode(mindMap)
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mindmap;
