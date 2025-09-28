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
import { Gamepad2, ArrowLeft, Wind, Sun, Droplets, Spade, Wheat, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

function GamePlayer({ game, onBack }: { game: Game; onBack: () => void }) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string, correct: boolean } | null>(null);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [plantState, setPlantState] = useState({
    soil: 'default', // 'prepared', 'tilled', 'sandy'
    seeded: false,
    watered: false,
    growth: 0, // 0-4 stages
    weeds: false,
  });

  const level = game.levels[currentLevelIndex];

  const handleChoice = (choice: Choice) => {
    setFeedback({ text: choice.feedback, correct: choice.isCorrect });
    setIsLevelCompleted(true);

    if (choice.isCorrect) {
      // Update game state based on correct choice
      switch (level.level) {
        case 1: // Soil Prep
          setPlantState(s => ({ ...s, soil: 'prepared' }));
          break;
        case 2: // Planting
          setPlantState(s => ({ ...s, seeded: true }));
          break;
        case 3: // Watering
          setPlantState(s => ({ ...s, watered: true, growth: 1 }));
          break;
        case 4: // Growth & Care
          setPlantState(s => ({ ...s, weeds: false, growth: 3 }));
          break;
        case 5: // Harvest
          setPlantState(s => ({ ...s, growth: 4 }));
          setIsGameWon(true);
          break;
      }
    } else {
        // Handle incorrect choices affecting state
        if(level.level === 1 && choice.text.includes('Till')) {
            setPlantState(s => ({...s, soil: 'tilled'}));
        } else if (level.level === 4 && choice.text.includes('chemical')) {
            setPlantState(s => ({ ...s, soil: 'prepared' })); // Show soil as damaged
        }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < game.levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setIsLevelCompleted(false);
      setFeedback(null);
      // Introduce new challenges for the next level
      if (game.levels[currentLevelIndex + 1].level === 4) {
        setPlantState(s => ({...s, growth: 2, weeds: true}))
      }
    }
  };

  const resetGame = () => {
    setCurrentLevelIndex(0);
    setIsLevelCompleted(false);
    setFeedback(null);
    setIsGameWon(false);
    setPlantState({
      soil: 'default',
      seeded: false,
      watered: false,
      growth: 0,
      weeds: false,
    });
  };
  
  const getPlantStage = () => {
    if (plantState.growth === 4) return '🌾'; // Harvested
    if (plantState.growth === 3) return '🌱'; // Grown
    if (plantState.growth === 2) return '🌱'; // Sprouted with weeds
    if (plantState.growth === 1) return '🌱'; // Sprouted
    if (plantState.seeded) return '·'; // Seed
    return '';
  };
  
  const getSoilClass = () => {
    if(feedback && !feedback.correct && level.level === 4) return 'bg-red-900/40' // Damaged soil
    switch (plantState.soil) {
      case 'prepared':
        return 'bg-yellow-900/50'; // Rich soil
      case 'tilled':
        return 'bg-yellow-700/40'; // Over-tilled
      case 'default':
      default:
        return 'bg-yellow-800/20'; // Default soil
    }
  }


  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-headline text-3xl">
              <Gamepad2 className="h-8 w-8 text-accent" />
              {game.title}
            </CardTitle>
            <CardDescription>{isGameWon ? "Congratulations! You've successfully harvested your crop!" : level.title}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Farm Plot */}
        <div className='flex flex-col items-center justify-center bg-muted/50 rounded-lg p-4 border border-dashed'>
            <div className='w-full h-48 relative rounded-md overflow-hidden'>
                {/* Sky */}
                <div className='absolute inset-x-0 top-0 h-2/3 bg-blue-200 flex justify-end p-2'>
                    <Sun className="text-yellow-400 w-8 h-8" />
                </div>
                {/* Soil */}
                <div className={cn('absolute inset-x-0 bottom-0 h-1/3 transition-colors duration-500', getSoilClass())}></div>
                {/* Plant */}
                 <div className='absolute inset-0 flex items-center justify-center text-6xl'>
                    <span className={cn(plantState.growth > 0 && plantState.growth < 4 && 'text-green-600')}>{getPlantStage()}</span>
                 </div>
                 {/* Weeds */}
                 {plantState.weeds && (
                    <>
                     <div className='absolute bottom-[33%] left-[30%] text-2xl text-green-800/80'>V</div>
                     <div className='absolute bottom-[33%] left-[60%] text-2xl text-green-800/80'>V</div>
                    </>
                 )}
            </div>
            <p className='text-sm text-muted-foreground mt-2'>Your virtual farm plot</p>
        </div>
        
        {/* Game Controls */}
        <div className="space-y-4">
          <p className="text-muted-foreground">{level.description}</p>
          <div className="grid grid-cols-1 gap-3">
            {level.choices.map((choice, index) => (
              <Button
                key={index}
                variant={'outline'}
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
          <div className={cn(
              "w-full rounded-md border p-4 flex gap-4 items-center",
              feedback?.correct ? "bg-primary/10 border-primary/50" : "bg-destructive/10 border-destructive/50"
            )}>
              {feedback?.correct ? <CheckCircle className="text-primary w-6 h-6 shrink-0"/> : <XCircle className="text-destructive w-6 h-6 shrink-0"/>}
            <div>
                <p className="font-semibold">{feedback?.correct ? "Good Choice!" : "Think Again..."}</p>
                <p>{feedback?.text}</p>
            </div>
          </div>
          {isGameWon ? (
            <Button onClick={resetGame}>Play Again</Button>
          ) : feedback?.correct && currentLevelIndex < game.levels.length - 1 ? (
             <Button onClick={handleNextLevel}>Next Stage</Button>
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
