
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

const Flashcards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  
  // Sample flashcards
  const flashcards = [
    {
      front: "What is a neural network?",
      back: "A neural network is a computing system inspired by the biological neural networks in animal brains. It consists of artificial neurons organized in layers that can learn to perform tasks by analyzing examples."
    },
    {
      front: "What is backpropagation?",
      back: "Backpropagation is an algorithm used to train neural networks by calculating the gradient of the loss function with respect to each weight. It propagates the error backward through the network to adjust weights and minimize error."
    },
    {
      front: "What is an activation function?",
      back: "An activation function introduces non-linearity into a neural network, allowing it to learn complex patterns. Common examples include ReLU, sigmoid, and tanh functions."
    },
    {
      front: "What is a Convolutional Neural Network (CNN)?",
      back: "A Convolutional Neural Network is a type of neural network designed primarily for processing grid-like data, such as images. It uses convolutional layers to automatically learn spatial hierarchies of features."
    },
    {
      front: "What is overfitting?",
      back: "Overfitting occurs when a model learns the training data too well, including its noise and outliers, resulting in poor performance on new, unseen data."
    }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const markAsKnown = () => {
    if (!knownCards.includes(currentCardIndex)) {
      setKnownCards([...knownCards, currentCardIndex]);
    }
    handleNext();
  };

  const restartDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
  };

  const shuffleDeck = () => {
    setCurrentCardIndex(Math.floor(Math.random() * flashcards.length));
    setIsFlipped(false);
  };

  const progressPercentage = (knownCards.length / flashcards.length) * 100;

  return (
    <div className="container mx-auto max-w-3xl fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
        <p className="text-muted-foreground">
          Review key concepts with these interactive flashcards
        </p>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">
            Card {currentCardIndex + 1} of {flashcards.length}
          </span>
          <span className="text-sm">
            {knownCards.length} of {flashcards.length} cards marked as known
          </span>
        </div>
        <Progress value={progressPercentage} />
      </div>

      <div className="perspective-1000 mb-8">
        <div
          className={cn(
            "relative w-full h-[300px] cursor-pointer transition-transform duration-500 transform-style-3d",
            isFlipped ? "rotate-y-180" : ""
          )}
          onClick={handleFlip}
        >
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg border p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold">{flashcards[currentCardIndex].front}</p>
              <p className="text-sm text-muted-foreground mt-4">Click to flip</p>
            </div>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl shadow-lg border p-6 flex items-center justify-center">
            <div className="text-center">
              <p>{flashcards[currentCardIndex].back}</p>
              <p className="text-sm text-muted-foreground mt-4">Click to flip back</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={restartDeck}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={shuffleDeck}
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>Shuffle</span>
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={handleNext}
            >
              Still Learning
            </Button>
            <Button
              onClick={markAsKnown}
              className={knownCards.includes(currentCardIndex) ? "opacity-50" : ""}
            >
              I Know This
            </Button>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Flashcards;
