import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// 1. Quiz Questions
const questions = [
  {
    id: 1,
    question: "How would you describe your energy level right now?",
    options: [
      { id: "a", text: "Very low, I feel drained", mood: "sad" },
      { id: "b", text: "Relaxed and peaceful", mood: "calm" },
      { id: "c", text: "Excited and full of energy", mood: "energetic" },
      { id: "d", text: "Content and positive", mood: "happy" },
    ],
  },
  {
    id: 2,
    question: "What kind of activity appeals to you most right now?",
    options: [
      { id: "a", text: "Resting or sleeping", mood: "sad" },
      { id: "b", text: "Meditation or reading", mood: "calm" },
      { id: "c", text: "Exercise or dancing", mood: "energetic" },
      { id: "d", text: "Socializing or creative projects", mood: "happy" },
    ],
  },
  {
    id: 3,
    question: "What's your current stress level?",
    options: [
      { id: "a", text: "Overwhelmed", mood: "sad" },
      { id: "b", text: "Minimal stress", mood: "calm" },
      { id: "c", text: "Positive stress/excitement", mood: "energetic" },
      { id: "d", text: "Balanced", mood: "happy" },
    ],
  },
];

// 2. MoodQuiz Component
const MoodQuiz = ({ onComplete }: { onComplete: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Finish quiz and move to the product page
        onComplete();
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Mood Quiz</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {questions.length}
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        <CardContent className="pt-6">
          <h3 className="text-xl font-medium mb-4">{question.question}</h3>
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
            <div className="grid gap-4">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <RadioGroupItem value={option.mood} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
                setSelectedOption(answers[currentQuestion - 1] || null);
                setAnswers(answers.slice(0, -1));
              }
            }}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!selectedOption}>
            {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// 3. Product Page Component (Generic Product Page)
const ProductPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold">Our Products</h2>
      <p>Explore our range of products, carefully selected to suit a variety of moods and preferences!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Product Card Example */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl font-medium">Comfort Blanket</h3>
          <p>A soft blanket to keep you cozy during cold nights.</p>
          <p>Price: $20.00</p>
          <Button onClick={() => alert("Product added to cart!")}>Add to Cart</Button>
        </div>
        {/* More products */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl font-medium">Meditation Kit</h3>
          <p>Everything you need to create a peaceful meditation space.</p>
          <p>Price: $35.00</p>
          <Button onClick={() => alert("Product added to cart!")}>Add to Cart</Button>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl font-medium">Fitness Equipment</h3>
          <p>Get active and energize yourself with this fitness set.</p>
          <p>Price: $50.00</p>
          <Button onClick={() => alert("Product added to cart!")}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

// 4. Combined Component
const MoodQuizAndProductPage = () => {
  const router = useRouter();
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    // After the quiz is completed, redirect to the product page
    router.push(`/product`);
  };

  return (
    <div>
      {quizCompleted ? (
        <ProductPage />
      ) : (
        <MoodQuiz onComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default MoodQuizAndProductPage;
