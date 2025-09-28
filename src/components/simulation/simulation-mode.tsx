'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';
import { useState } from 'react';

type Scenario = {
  title: string;
  description: string;
  choices: { text: string; isCorrect: boolean; feedback: string }[];
};

const scenarios: Scenario[] = [
  {
    title: 'Pest Invasion!',
    description:
      'You notice small, yellow insects on the underside of your tomato plant leaves. They seem to be multiplying quickly. What is your first organic-approved action?',
    choices: [
      {
        text: 'Spray with a strong chemical pesticide.',
        isCorrect: false,
        feedback: 'Incorrect. Chemical pesticides are not allowed in organic farming and can harm beneficial insects.',
      },
      {
        text: 'Introduce ladybugs to the area.',
        isCorrect: true,
        feedback: 'Excellent choice! Ladybugs are natural predators of aphids and a great organic pest control method.',
      },
      {
        text: 'Ignore them and hope they go away.',
        isCorrect: false,
        feedback: 'Not a good idea. Pests can quickly destroy a crop if left unchecked.',
      },
    ],
  },
];

export function SimulationMode() {
  const [currentScenario] = useState<Scenario>(scenarios[0]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoice = (choice: { text: string; feedback: string }) => {
    setSelectedChoice(choice.text);
    setFeedback(choice.feedback);
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <Gamepad2 className="h-8 w-8 text-accent" />
            Sim-Farm Training
          </CardTitle>
          <CardDescription>
            Test your farming knowledge in this interactive simulation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold text-xl text-primary">{currentScenario.title}</h3>
            <p className="text-muted-foreground">{currentScenario.description}</p>
            <div className="grid grid-cols-1 gap-3">
              {currentScenario.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant={selectedChoice === choice.text ? (choice.isCorrect ? 'default' : 'destructive') : 'outline'}
                  onClick={() => handleChoice(choice)}
                  disabled={!!selectedChoice}
                  className="h-auto min-h-12 justify-start whitespace-normal text-left"
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        {feedback && (
          <CardFooter>
            <div className="w-full rounded-md border p-4">
              <p className="font-semibold">Feedback:</p>
              <p>{feedback}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
