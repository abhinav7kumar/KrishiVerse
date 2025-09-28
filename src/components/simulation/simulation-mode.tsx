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
import { Gamepad2, ArrowLeft, Wind, Sun, Droplets, Spade, Wheat, AlertTriangle, CheckCircle, XCircle, Bug, Shield, Tractor } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';


export type Choice = {
  text: string;
  isCorrect: boolean;
  feedback: string;
  action: string;
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

  const initialGameState = useMemo(() => ({
    soil: 'default', // 'prepared', 'tilled', 'damaged', 'compost'
    water: 50, // 0-100
    growth: 0, // 0-4 stages
    pests: false,
    weeds: false,
    seeded: false,
    crop: game.id === 'crop-growth' ? 'wheat' : 'generic'
  }), [game.id]);
  
  const [gameState, setGameState] = useState(initialGameState);

  const level = game.levels[currentLevelIndex];

  const handleChoice = (choice: Choice) => {
    setFeedback({ text: choice.feedback, correct: choice.isCorrect });
    setIsLevelCompleted(true);
    
    // Update game state based on the action
    setGameState(prev => {
      let newState = { ...prev };
      switch (choice.action) {
        // Soil Actions
        case 'add_compost': newState.soil = 'compost'; break;
        case 'till_soil': newState.soil = 'tilled'; break;
        case 'do_nothing_soil': newState.soil = 'damaged'; break;
        
        // Planting Actions
        case 'plant_seeds': newState.seeded = true; break;
        case 'plant_crowded': newState.growth = -1; break; // Withered state
        case 'plant_deep': newState.seeded = true; break; // Will fail to sprout

        // Watering Actions
        case 'drip_irrigation': newState.water = Math.min(100, prev.water + 40); if(newState.seeded) newState.growth=1; break;
        case 'sprinkler': newState.water = Math.min(100, prev.water + 20); if(newState.seeded) newState.growth=1; break;
        case 'flood': newState.water = 100; newState.growth = -1; break; // Withered
        
        // Pest Control Actions
        case 'add_ladybugs': newState.pests = false; break;
        case 'use_chemicals': newState.pests = false; newState.soil = 'damaged'; break;
        case 'do_nothing_pests': newState.growth = Math.max(0, prev.growth - 1); break;
        
        // Weeding Actions
        case 'hand_weed': newState.weeds = false; newState.growth = Math.min(4, prev.growth + 1); break;

        // Harvest Action
        case 'harvest': newState.growth = 4; setIsGameWon(true); break;
        
        // General incorrect actions
        case 'fail_choice': 
            if(level.title.includes("Pest")){ newState.growth = 0; }
            if(level.title.includes("Water")){ newState.water = 10; }
            break;
      }
      return newState;
    });
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < game.levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setIsLevelCompleted(false);
      setFeedback(null);
      
      // Introduce new challenges for the next level based on game type
      setGameState(prev => {
        let newState = { ...prev };
        const nextLevel = game.levels[currentLevelIndex + 1];

        if (nextLevel.title.includes("Pest")) {
          newState.pests = true;
        }
        if (nextLevel.title.includes("Care") || nextLevel.title.includes("Weed")) {
          newState.weeds = true;
          newState.growth = 2;
        }
        if(nextLevel.title.includes("Water")) {
           newState.water = 30; // Simulate water usage
        }
        return newState;
      });
    }
  };

  const resetGame = () => {
    setCurrentLevelIndex(0);
    setIsLevelCompleted(false);
    setFeedback(null);
    setIsGameWon(false);
    setGameState(initialGameState);
  };
  
  const getPlantStage = () => {
    if (gameState.growth === -1) return '🥀'; // Withered
    if (gameState.growth === 4) return '🌾'; // Harvested
    if (gameState.growth === 3) return '🌱'; // Grown
    if (gameState.growth === 2) return '🌱'; // Sprouted with challenges
    if (gameState.growth === 1) return '🌱'; // Sprouted
    if (gameState.seeded) return '·'; // Seed
    return '';
  };
  
  const getSoilClass = () => {
    switch (gameState.soil) {
      case 'compost': return 'bg-yellow-900/60'; // Rich soil
      case 'prepared': return 'bg-yellow-900/50';
      case 'tilled': return 'bg-yellow-700/40'; // Over-tilled
      case 'damaged': return 'bg-red-900/40'; // Damaged
      case 'default': default: return 'bg-yellow-800/20'; // Default soil
    }
  }

  const getWaterLevelStyle = () => {
      const height = `${gameState.water}%`;
      return { height };
  }

  const getIconForGame = () => {
    switch(game.id) {
        case 'crop-growth': return <Wheat className="h-8 w-8 text-secondary" />;
        case 'pest-control': return <Shield className="h-8 w-8 text-destructive" />;
        case 'water-management': return <Droplets className="h-8 w-8 text-blue-500" />;
        case 'soil-health': return <Tractor className="h-8 w-8 text-yellow-800" />;
        default: return <Gamepad2 className="h-8 w-8 text-accent" />;
    }
  }


  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-headline text-3xl">
              {getIconForGame()}
              {game.title}
            </CardTitle>
            <CardDescription>{isGameWon ? "Congratulations! You've completed the simulation!" : level.title}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Farm Plot */}
        <div className='flex flex-col items-center justify-center bg-muted/50 rounded-lg p-4 border border-dashed'>
            <div className='w-full h-56 relative rounded-md overflow-hidden'>
                {/* Sky */}
                <div className='absolute inset-x-0 top-0 h-2/3 bg-blue-200 flex justify-end p-2'>
                    <Sun className="text-yellow-400 w-8 h-8" />
                </div>

                {/* Soil & Water */}
                <div className={cn('absolute inset-x-0 bottom-0 h-1/3 transition-colors duration-500', getSoilClass())}>
                   <div className="absolute inset-0 bg-blue-400/30 transition-all" style={getWaterLevelStyle()}></div>
                </div>
                
                {/* Plant */}
                 <div className='absolute inset-0 flex items-center justify-center text-6xl'>
                    <span className={cn(gameState.growth > 0 && gameState.growth < 4 && 'text-green-600')}>{getPlantStage()}</span>
                 </div>

                 {/* Weeds & Pests */}
                 {gameState.weeds && (
                    <>
                     <div className='absolute bottom-[33%] left-[30%] text-2xl text-green-800/80'>V</div>
                     <div className='absolute bottom-[33%] left-[60%] text-2xl text-green-800/80'>V</div>
                    </>
                 )}
                 {gameState.pests && (
                     <div className='absolute bottom-[40%] left-[48%] text-lg'>
                        <Bug className="w-5 h-5 text-gray-900 animate-pulse" />
                     </div>
                 )}
            </div>
            <div className="w-full space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>Water Level:</span>
                    <Progress value={gameState.water} className="w-full h-2" />
                </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tractor className="w-4 h-4 text-yellow-800" />
                    <span>Soil: <span className="font-semibold capitalize text-foreground">{gameState.soil}</span></span>
                </div>
            </div>
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

  const getIconForGame = (gameId: string) => {
     switch(gameId) {
        case 'crop-growth': return <Wheat className="h-5 w-5 text-secondary" />;
        case 'pest-control': return <Shield className="h-5 w-5 text-destructive" />;
        case 'water-management': return <Droplets className="h-5 w-5 text-blue-500" />;
        case 'soil-health': return <Tractor className="h-5 w-5 text-yellow-800" />;
        default: return <Gamepad2 className="h-5 w-5 text-accent" />;
    }
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
              className="h-auto flex-col items-start p-4 text-left hover:bg-accent hover:text-accent-foreground"
              onClick={() => setSelectedGame(game)}
            >
              <p className="font-semibold text-primary flex items-center gap-2">
                {getIconForGame(game.id)}
                {game.title}
              </p>
              <p className="text-sm text-muted-foreground whitespace-normal">{game.description}</p>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
