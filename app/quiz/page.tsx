import React, { createContext, useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

// 1. Cart Context for managing the cart globally
const CartContext = createContext<any>(null);

// CartProvider component to wrap around the application
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart in any component
export const useCart = () => useContext(CartContext);

// 2. Mood Quiz Component
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
  // Add more questions if needed
];

const MoodQuiz = () => {
  const router = useRouter();
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
        // Calculate dominant mood
        const moodCounts: Record<string, number> = {};
        newAnswers.forEach((mood) => {
          moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        });

        const dominantMood = Object.entries(moodCounts).reduce(
          (max, [mood, count]) => (count > max[1] ? [mood, count] : max),
          ["", 0]
        )[0];

        // Redirect to product page with mood
        router.push(`/product?mood=${dominantMood}`);
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

// 3. Product Page with "Add to Cart"
const ProductPage = () => {
  const { addToCart } = useCart();

  const product = {
    name: 'Product based on mood',
    description: 'This product matches your mood based on your quiz results.',
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert('Product added to cart!');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <p>{product.description}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

// 4. Main App component to wrap with CartProvider
const App = () => {
  return (
    <CartProvider>
      <MoodQuiz />
      <ProductPage />
    </CartProvider>
  );
};

export default App;
