
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, CornerDownRight, ArrowRight, ChevronRight, Trophy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [quizType, setQuizType] = useState("mcq");

  // Mock quiz questions
  const mcqQuestions = [
    {
      question: "Which of the following is NOT a type of neural network?",
      options: [
        "Convolutional Neural Network (CNN)",
        "Recurrent Neural Network (RNN)",
        "Bilateral Neural Network (BNN)",
        "Generative Adversarial Network (GAN)"
      ],
      correctAnswer: "Bilateral Neural Network (BNN)",
      explanation: "Bilateral Neural Network (BNN) is a fictional type. The common types of neural networks include Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), Generative Adversarial Networks (GANs), and Transformers."
    },
    {
      question: "What is the purpose of an activation function in a neural network?",
      options: [
        "To initialize the weights of the network",
        "To introduce non-linearity to the model",
        "To normalize the input data",
        "To reduce the learning rate during training"
      ],
      correctAnswer: "To introduce non-linearity to the model",
      explanation: "Activation functions introduce non-linearity into the neural network, allowing it to learn and perform complex tasks. Without activation functions, the neural network would behave like a linear regression model, regardless of its depth."
    },
    {
      question: "Which algorithm is commonly used to train neural networks?",
      options: [
        "K-means clustering",
        "Decision trees",
        "Backpropagation",
        "Principal Component Analysis"
      ],
      correctAnswer: "Backpropagation",
      explanation: "Backpropagation is the primary algorithm used to train neural networks. It works by calculating the gradient of the loss function with respect to each weight, allowing the network to adjust weights to minimize error."
    }
  ];

  const shortAnswerQuestions = [
    {
      question: "Explain the difference between supervised and unsupervised learning.",
      sampleAnswer: "Supervised learning involves training a model using labeled data, where the desired output is known. The model learns to map inputs to outputs based on example input-output pairs. Unsupervised learning, in contrast, uses unlabeled data and seeks to find patterns or structures within the data without specific guidance about what to look for."
    },
    {
      question: "What is overfitting in machine learning and how can it be prevented?",
      sampleAnswer: "Overfitting occurs when a model learns the training data too well, including its noise and outliers, resulting in poor performance on new, unseen data. It can be prevented through techniques like regularization, early stopping, using more training data, data augmentation, and implementing dropout in neural networks."
    }
  ];

  const handleNextQuestion = () => {
    // For MCQ: Check if answer is correct and update score
    if (quizType === "mcq") {
      if (selectedAnswer === mcqQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
    
    // Move to next question or end quiz
    if (quizType === "mcq" && currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  const handleQuizTypeChange = (value: string) => {
    setQuizType(value);
    resetQuiz();
  };

  // Calculate progress percentage
  const progressPercentage = quizType === "mcq" 
    ? ((currentQuestion + 1) / mcqQuestions.length) * 100
    : 100;

  return (
    <div className="container mx-auto max-w-3xl fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Quiz Me</h1>
        <p className="text-muted-foreground">
          Test your knowledge with personalized quizzes
        </p>
      </div>

      <Tabs value={quizType} onValueChange={handleQuizTypeChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
          <TabsTrigger value="short-answer">Short Answer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mcq">
          {!completed ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {mcqQuestions.length}
                  </div>
                  <div className="text-sm font-medium">
                    Score: {score}/{mcqQuestions.length}
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <CardTitle className="text-xl mt-4">
                  {mcqQuestions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                >
                  {mcqQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option} 
                        id={`option-${index}`} 
                        disabled={showExplanation}
                      />
                      <Label 
                        htmlFor={`option-${index}`}
                        className={`flex-1 cursor-pointer ${
                          showExplanation && option === mcqQuestions[currentQuestion].correctAnswer
                            ? "text-green-600 font-medium"
                            : showExplanation && option === selectedAnswer
                              ? "text-red-500 line-through"
                              : ""
                        }`}
                      >
                        {option}
                        {showExplanation && option === mcqQuestions[currentQuestion].correctAnswer && (
                          <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                        )}
                        {showExplanation && option === selectedAnswer && option !== mcqQuestions[currentQuestion].correctAnswer && (
                          <XCircle className="inline ml-2 h-4 w-4 text-red-500" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {showExplanation && (
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <div className="flex items-start gap-2">
                      <CornerDownRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Explanation</p>
                        <p className="text-sm text-muted-foreground">
                          {mcqQuestions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!showExplanation ? (
                  <Button 
                    onClick={() => setShowExplanation(true)} 
                    variant="outline"
                    disabled={!selectedAnswer}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button variant="outline" onClick={resetQuiz}>
                    Restart Quiz
                  </Button>
                )}
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                >
                  {currentQuestion < mcqQuestions.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Finish Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  Quiz Completed!
                </CardTitle>
                <CardDescription>
                  You scored {score} out of {mcqQuestions.length} questions correctly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-5xl font-bold mb-2">
                    {Math.round((score / mcqQuestions.length) * 100)}%
                  </div>
                  <p className="text-muted-foreground">
                    {score === mcqQuestions.length
                      ? "Perfect score! Excellent work!"
                      : score >= mcqQuestions.length / 2
                      ? "Good job! Keep studying to improve."
                      : "Keep practicing to improve your score."}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={resetQuiz} className="w-full">
                  Try Again
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="short-answer">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {shortAnswerQuestions[currentQuestion].question}
              </CardTitle>
              <CardDescription>
                Write your answer in the text area below. Be concise but thorough.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your answer here..."
                className="min-h-[200px]"
              />
              
              {showExplanation && (
                <div className="p-4 border rounded-md space-y-2">
                  <p className="font-medium">Sample Answer:</p>
                  <p className="text-muted-foreground text-sm">
                    {shortAnswerQuestions[currentQuestion].sampleAnswer}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? "Hide" : "Show"} Sample Answer
              </Button>
              
              {currentQuestion < shortAnswerQuestions.length - 1 ? (
                <Button onClick={() => {
                  setCurrentQuestion(currentQuestion + 1);
                  setShowExplanation(false);
                }}>
                  Next Question
                </Button>
              ) : (
                <Button onClick={resetQuiz}>
                  Reset Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quiz;
