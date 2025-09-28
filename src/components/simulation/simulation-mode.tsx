'use client';

import { simFarmGames } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export type Choice = {
  text: string;
  isCorrect: boolean;
  feedback: string;
};

export type Level = {
  level: number;
  title: string;
  description: string;
  choices: Choice[];
};

export type Game = {
  id: string;
  title: string;
  description: string;
  levels: Level[];
};

function GamePlayer({
  game,
  onBack,
}: {
  game: Game;
  onBack: () => void;
}) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isGameWon, setIsGameWon] = useState(false);

  const scenario = game.levels[currentLevel];

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice.text);
    setFeedback(choice.feedback);
    if (choice.isCorrect) {
      if (currentLevel === game.levels.length - 1) {
        setIsGameWon(true);
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < game.levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setSelectedChoice(null);
      setFeedback(null);
    }
  };
  
  const resetGame = () => {
    setCurrentLevel(0);
    setSelectedChoice(null);
    setFeedback(null);
    setIsGameWon(false);
  }

  const isLevelCompleted = !!selectedChoice;
  const wasChoiceCorrect =
    isLevelCompleted &&
    scenario.choices.find((c) => c.text === selectedChoice)?.isCorrect;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-headline text-3xl">
              <Gamepad2 className="h-8 w-8 text-accent" />
              {game.title}
            </CardTitle>
            <CardDescription>
              {isGameWon ? 'Congratulations!' : scenario.title}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">{scenario.description}</p>
          <div className="grid grid-cols-1 gap-3">
            {scenario.choices.map((choice, index) => (
              <Button
                key={index}
                variant={
                  selectedChoice === choice.text
                    ? choice.isCorrect
                      ? 'default'
                      : 'destructive'
                    : 'outline'
                }
                onClick={() => handleChoice(choice)}
                disabled={isLevelCompleted}
                className="h-auto min-h-12 justify-start whitespace-normal text-left"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      {isLevelCompleted && (
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="w-full rounded-md border p-4">
            <p className="font-semibold">Feedback:</p>
            <p>{feedback}</p>
          </div>
          {isGameWon ? (
            <Button onClick={resetGame}>Play Again</Button>
          ) : wasChoiceCorrect && currentLevel < game.levels.length - 1 ? (
             <Button onClick={handleNextLevel}>Next Level</Button>
          ): null}
        </CardFooter>
      )}
    </Card>
  );
}

export function SimulationMode() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  if (selectedGame) {
    return <GamePlayer game={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <Gamepad2 className="h-8 w-8 text-accent" />
            Sim-Farm Training
          </CardTitle>
          <CardDescription>
            Test your farming knowledge in these interactive simulations. Choose a game to start.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {simFarmGames.map((game) => (
            <Button
              key={game.id}
              variant="outline"
              className="h-auto flex-col items-start p-4 text-left"
              onClick={() => setSelectedGame(game)}
            >
              <p className="font-semibold text-primary">{game.title}</p>
              <p className="text-sm text-muted-foreground whitespace-normal">{game.description}</p>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
