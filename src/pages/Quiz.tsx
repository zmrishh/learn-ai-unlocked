
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, CornerDownRight, ArrowRight, ChevronRight, Trophy, EyeIcon, PencilIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Define quiz modes: Preview, Quiz, Feedback
type QuizMode = "preview" | "quiz" | "feedback";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [quizMode, setQuizMode] = useState<QuizMode>("preview");
  const [score, setScore] = useState(0);
  const [quizType, setQuizType] = useState("mcq");
  const [shortAnswerResponse, setShortAnswerResponse] = useState("");
  const [shortAnswerResponses, setShortAnswerResponses] = useState<string[]>([]);

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

  const handleStartQuiz = () => {
    setQuizMode("quiz");
    // Initialize user answers array for MCQ with nulls
    if (quizType === "mcq") {
      setUserAnswers(Array(mcqQuestions.length).fill(null));
    } else {
      setShortAnswerResponses(Array(shortAnswerQuestions.length).fill(""));
    }
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleNextQuestion = () => {
    if (quizType === "mcq") {
      // Store the current answer
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newUserAnswers);
    } else {
      // Store short answer response
      const newResponses = [...shortAnswerResponses];
      newResponses[currentQuestion] = shortAnswerResponse;
      setShortAnswerResponses(newResponses);
    }
    
    // Move to next question or finish quiz
    if (currentQuestion < (quizType === "mcq" ? mcqQuestions.length - 1 : shortAnswerQuestions.length - 1)) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShortAnswerResponse("");
    } else {
      // Calculate score for MCQ quiz
      if (quizType === "mcq") {
        let totalScore = 0;
        for (let i = 0; i < mcqQuestions.length; i++) {
          if (userAnswers[i] === mcqQuestions[i].correctAnswer) {
            totalScore++;
          }
        }
        setScore(totalScore);
      }
      setQuizMode("feedback");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShortAnswerResponse("");
    setUserAnswers([]);
    setShortAnswerResponses([]);
    setScore(0);
    setQuizMode("preview");
  };

  const handleQuizTypeChange = (value: string) => {
    setQuizType(value);
    resetQuiz();
  };

  // Calculate progress percentage
  const progressPercentage = quizType === "mcq" 
    ? ((currentQuestion + 1) / mcqQuestions.length) * 100
    : ((currentQuestion + 1) / shortAnswerQuestions.length) * 100;

  // Render the quiz based on the current mode
  const renderQuizContent = () => {
    // Preview Mode - User can browse questions before starting the quiz
    if (quizMode === "preview") {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Preview Questions
            </CardTitle>
            <CardDescription>
              Browse through the questions before starting the quiz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quizType === "mcq" ? (
              <div className="space-y-6">
                {mcqQuestions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <p className="font-medium mb-3">Question {index + 1}: {q.question}</p>
                    <ul className="space-y-2 pl-5 list-disc text-muted-foreground">
                      {q.options.map((option, optIndex) => (
                        <li key={optIndex}>{option}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {shortAnswerQuestions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <p className="font-medium mb-2">Question {index + 1}: {q.question}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartQuiz} className="w-full mt-4">
              <PencilIcon className="mr-2 h-4 w-4" />
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      );
    }
    
    // Quiz Mode - User is actively taking the quiz
    if (quizMode === "quiz") {
      return (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizType === "mcq" ? mcqQuestions.length : shortAnswerQuestions.length}
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <CardTitle className="text-xl mt-4">
              {quizType === "mcq" 
                ? mcqQuestions[currentQuestion].question
                : shortAnswerQuestions[currentQuestion].question
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quizType === "mcq" ? (
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={setSelectedAnswer}
                className="space-y-3"
              >
                {mcqQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Textarea
                placeholder="Type your answer here..."
                className="min-h-[200px]"
                value={shortAnswerResponse}
                onChange={(e) => setShortAnswerResponse(e.target.value)}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {quizType === "mcq" ? (
              <Button 
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="ml-auto"
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
            ) : (
              <Button 
                onClick={handleNextQuestion}
                disabled={!shortAnswerResponse.trim()}
                className="ml-auto"
              >
                {currentQuestion < shortAnswerQuestions.length - 1 ? (
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
            )}
          </CardFooter>
        </Card>
      );
    }
    
    // Feedback Mode - After completing the quiz
    if (quizMode === "feedback") {
      if (quizType === "mcq") {
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-500" />
                Quiz Results
              </CardTitle>
              <CardDescription>
                You scored {score} out of {mcqQuestions.length} questions correctly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 mb-6">
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
              
              <div className="space-y-6">
                {mcqQuestions.map((q, index) => {
                  const isCorrect = userAnswers[index] === q.correctAnswer;
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-md ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">Question {index + 1}: {q.question}</p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">Your answer: </span> 
                            <span className={!isCorrect ? 'text-red-600' : ''}>{userAnswers[index] || "No answer provided"}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mt-1">
                              <span className="font-medium">Correct answer: </span> 
                              {q.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 ml-7">
                        <p className="text-sm font-medium">Explanation:</p>
                        <p className="text-sm text-muted-foreground">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={resetQuiz} className="w-full">
                Try Again
              </Button>
            </CardFooter>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-500" />
                Quiz Completed
              </CardTitle>
              <CardDescription>
                Review your answers against the sample answers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {shortAnswerQuestions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <p className="font-medium mb-2">Question {index + 1}: {q.question}</p>
                    
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-sm font-medium">Your Answer:</p>
                        <p className="text-sm p-2 bg-muted rounded-md">
                          {shortAnswerResponses[index] || "No answer provided"}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Sample Answer:</p>
                        <p className="text-sm p-2 bg-green-50 rounded-md border border-green-100">
                          {q.sampleAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={resetQuiz} className="w-full">
                Try Again
              </Button>
            </CardFooter>
          </Card>
        );
      }
    }
  };

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
          {renderQuizContent()}
        </TabsContent>
        
        <TabsContent value="short-answer">
          {renderQuizContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quiz;
