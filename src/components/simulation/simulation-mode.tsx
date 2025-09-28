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
import { Gamepad2, ArrowLeft, Wind, Sun, Droplets, Spade, Wheat, AlertTriangle, CheckCircle, XCircle, Bug, Shield, Tractor, Leaf, Bone, TestTube, Trees, Recycle, Repeat, Scissors } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
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


// SVG components for plant stages
const Seed = () => <circle cx="12" cy="18" r="1.5" fill="#5C3A21" />;
const Sprout = () => (
  <g>
    <path d="M12 18 Q 11 15, 10 12" stroke="#34D399" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M10 12 C 8 11, 9 9, 10.5 10" stroke="#34D399" strokeWidth="1.5" fill="#34D399" />
    <path d="M10 12 C 12 11, 11 9, 9.5 10" stroke="#34D399" strokeWidth="1.5" fill="#34D399" />
  </g>
);
const Seedling = () => (
  <g transform="translate(0 2)">
    <path d="M12 18 V 10" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M12 10 C 8 8, 10 4, 12 6" stroke="#10B981" strokeWidth="1.5" fill="#10B981" />
    <path d="M12 10 C 16 8, 14 4, 12 6" stroke="#10B981" strokeWidth="1.5" fill="#10B981" />
    <path d="M12 13 C 9 12, 9 10, 11 11" stroke="#10B981" strokeWidth="1.5" fill="#10B981" />
    <path d="M12 13 C 15 12, 15 10, 13 11" stroke="#10B981" strokeWidth="1.5" fill="#10B981" />
  </g>
);
const GrownPlant = () => (
  <g transform="translate(0 -2)">
    <path d="M12 18 V 6" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Branch left */}
    <path d="M12 15 C 10 15, 9 13, 8 11" stroke="#059669" strokeWidth="2" fill="none" />
    <path d="M8 11 C 6 10, 7 8, 8.5 9" stroke="#059669" strokeWidth="1.5" fill="#10B981" />
    <path d="M8 11 C 10 10, 9 8, 7.5 9" stroke="#059669" strokeWidth="1.5" fill="#10B981" />
    {/* Branch right */}
    <path d="M12 12 C 14 12, 15 10, 16 8" stroke="#059669" strokeWidth="2" fill="none" />
    <path d="M16 8 C 14 7, 15 5, 16.5 6" stroke="#059669" strokeWidth="1.5" fill="#10B981" />
    <path d="M16 8 C 18 7, 17 5, 15.5 6" stroke="#059669" strokeWidth="1.5" fill="#10B981" />
    {/* Main top leaves */}
    <path d="M12 6 C 8 4, 10 0, 12 2" stroke="#059669" strokeWidth="1.5" fill="#10B981" />
    <path d="M12 6 C 16 4, 14 0, 12 2" stroke="#059669" strokeWidth="1.5" fill="#10B981" />
  </g>
);
const FruitingPlant = () => (
  <g>
    <GrownPlant />
    <circle cx="7" cy="8" r="2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
    <circle cx="17" cy="5" r="2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
    <circle cx="11" cy="14" r="2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
  </g>
);
const HarvestedPlant = () => (
  <g>
    <path d="M12 18 V 8" stroke="#A16207" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M12 14 L 8 13" stroke="#A16207" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M12 11 L 15 10" stroke="#A16207" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </g>
);
const WitheredPlant = () => (
  <g transform="scale(0.9) translate(1, 2)">
    <path d="M12 18 C 10 15, 10 12, 11 10" stroke="#78350F" strokeWidth="1.5" fill="none" />
    <path d="M11 10 C 12 8, 13 10, 13 10" stroke="#78350F" strokeWidth="1.5" fill="none" />
    <path d="M11 14 C 9 13, 8 12, 9 11" stroke="#78350F" strokeWidth="1" fill="none" />
    <path d="M13 12 C 15 11, 15 10, 14 9" stroke="#78350F" strokeWidth="1" fill="none" />
  </g>
);


function GamePlayer({ game, onBack }: { game: Game; onBack: () => void }) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string, correct: boolean } | null>(null);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const initialGameState = useMemo(() => ({
    soil: 'default',
    water: 50,
    growth: 0,
    pests: false,
    weeds: false,
    seeded: false,
    beneficials: 0,
    nutrients: { n: 50, p: 50, k: 50 },
    crop: game.id === 'crop-growth' ? 'wheat' : 'generic',
    health: 100,
    mulch: false,
    year: 1, // For crop-rotation
  }), [game.id]);
  
  const [gameState, setGameState] = useState(initialGameState);
  const levelStateSnapshot = useRef(initialGameState);

  const level = game.levels[currentLevelIndex];

  useEffect(() => {
    // Snapshot the state when a new level starts
    levelStateSnapshot.current = { ...gameState };
  }, [currentLevelIndex, gameState]);

  useEffect(() => {
    if (gameState.health <= 0 && !isLevelCompleted && !isGameWon && !isGameOver) {
        setIsGameOver(true);
        setFeedback({ text: "Your farm has failed. Critical conditions were not met. You must restart to try again.", correct: false });
    }
  }, [gameState.health, isLevelCompleted, isGameWon, isGameOver]);


  const handleChoice = (choice: Choice) => {
    if(isLevelCompleted || isGameOver || isGameWon) return;

    setFeedback({ text: choice.feedback, correct: choice.isCorrect });
    setIsLevelCompleted(true);
    
    if (choice.isCorrect) {
        if (level.level === game.levels.length) {
            setIsGameWon(true);
        }
    } else {
        if(choice.action.includes('fail_game')) {
            setIsGameOver(true);
            setGameState(prev => ({...prev, health: 0}));
            return;
        }
    }

    setGameState(prev => {
      let newState = { ...prev };
      const [action, value] = choice.action.split(':');
      const numValue = value ? parseInt(value, 10) : 0;
      const boolValue = value === 'true';

      switch (action) {
        case 'add_compost': 
            newState.soil = 'compost'; 
            newState.nutrients = { n: Math.min(100, prev.nutrients.n + 20), p: Math.min(100, prev.nutrients.p + 10), k: Math.min(100, prev.nutrients.k + 15) }; 
            break;
        case 'till_soil': 
            newState.soil = 'tilled'; 
            newState.health = Math.max(0, prev.health - 25); 
            break;
        case 'plant_seeds': 
            newState.seeded = true; 
            if(newState.growth === 0) newState.growth = 1;
            break;
        case 'plant_deep': 
            newState.seeded = true; 
            newState.health = Math.max(0, prev.health - 25); 
            break;
        case 'plant_crowded': 
            newState.seeded = true; 
            newState.health = Math.max(0, prev.health - 50); 
            break;
        case 'drip_irrigation': 
            newState.water = Math.min(100, prev.water + 30); 
            if(newState.seeded && prev.growth < 2 && choice.isCorrect) newState.growth = 2; 
            break;
        case 'sprinkler': 
            newState.water = Math.min(100, prev.water + 15); 
            newState.health = Math.max(0, prev.health - 5); 
            break;
        case 'flood': 
            newState.water = 100; 
            newState.health = 0; 
            setIsGameOver(true);
            break;
        case 'add_ladybugs': 
            newState.pests = false; 
            newState.beneficials = Math.min(100, prev.beneficials + 40); 
            break;
        case 'use_chemicals': 
            newState.pests = false; 
            newState.soil = 'damaged'; 
            newState.health = Math.max(0, prev.health - 20); 
            newState.beneficials = 0; 
            break;
        case 'do_nothing_pests': 
            newState.health = Math.max(0, prev.health - 30); 
            break;
        case 'hand_weed': 
            newState.weeds = false; 
            break;
        case 'mulch': 
            newState.mulch = boolValue; 
            if(boolValue) {
                newState.water = Math.min(100, prev.water + 15); 
                newState.weeds = false;
            }
            break;
        case 'plant_cover_crop': 
            newState.soil = 'covered'; 
            newState.nutrients.n = Math.min(100, prev.nutrients.n + 15); 
            break;
        case 'harvest': 
            newState.growth = 5; 
            if(choice.isCorrect) setIsGameWon(true);
            break;
        case 'fail_choice': 
            newState.health = Math.max(0, prev.health - 20); 
            break;
        case 'fail_game':
            newState.health = 0;
            setIsGameOver(true);
            break;
        case 'set_growth': 
            newState.growth = numValue; 
            break;
        case 'set_health': 
            newState.health = Math.max(0, Math.min(100, prev.health + numValue)); 
            break;
        case 'set_water': 
            newState.water = Math.max(0, Math.min(100, prev.water + numValue)); 
            break;
        case 'set_weeds': 
            newState.weeds = boolValue; 
            break;
        case 'set_pests': 
            newState.pests = boolValue; 
            break;
        case 'add_npk': 
            newState.nutrients = { n: Math.min(100, prev.nutrients.n + 20), p: Math.min(100, prev.nutrients.p + 20), k: Math.min(100, prev.nutrients.k + 20)}; 
            break;
        case 'set_nutrients_n': 
            newState.nutrients.n = Math.max(0, Math.min(100, prev.nutrients.n + numValue)); 
            break;
        case 'set_nutrients_p':
            newState.nutrients.p = Math.max(0, Math.min(100, prev.nutrients.p + numValue));
            break;
        case 'set_nutrients_k':
            newState.nutrients.k = Math.max(0, Math.min(100, prev.nutrients.k + numValue));
            break;
        case 'add_beneficials': 
            newState.beneficials = Math.min(100, prev.beneficials + numValue); 
            break;
        case 'next_year':
            newState.year += 1;
            break;
      }
      if(newState.health <=0) setIsGameOver(true)
      return newState;
    });
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < game.levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setIsLevelCompleted(false);
      setFeedback(null);
      
      setGameState(prev => {
        let newState = { ...prev };
        const nextLevel = game.levels[currentLevelIndex + 1];

        // Simulate passage of time and resource consumption
        if (prev.seeded && prev.growth > 0) {
           newState.water = Math.max(0, prev.water - 15);
           newState.nutrients.n = Math.max(0, prev.nutrients.n - 10);
           newState.nutrients.p = Math.max(0, prev.nutrients.p - 10);
           newState.nutrients.k = Math.max(0, prev.nutrients.k - 10);
        }

        // Trigger events for the next level based on its title
        if (nextLevel.title.toLowerCase().includes("pest") || nextLevel.title.toLowerCase().includes("aphid")) newState.pests = true;
        if (nextLevel.title.toLowerCase().includes("weed")) newState.weeds = true;
        if (nextLevel.title.toLowerCase().includes("water") || nextLevel.title.toLowerCase().includes("heatwave")) newState.water = Math.max(0, newState.water - 20);
        
        if (prev.growth > 0 && prev.growth < 4 && prev.health > 20) {
            newState.growth = Math.min(4, prev.growth + 1);
        }
        
        return newState;
      });
    } else {
        setIsGameWon(true);
    }
  };

  const handleTryAgain = () => {
    setGameState(levelStateSnapshot.current);
    setIsLevelCompleted(false);
    setFeedback(null);
  };

  const resetGame = () => {
    setCurrentLevelIndex(0);
    setIsLevelCompleted(false);
    setFeedback(null);
    setIsGameWon(false);
    setIsGameOver(false);
    setGameState(initialGameState);
  };
  
  const getPlantStage = () => {
    if (gameState.health <= 0) return <WitheredPlant />;
    if (gameState.growth >= 5) return <HarvestedPlant />;
    if (gameState.growth === 4) return <FruitingPlant />;
    if (gameState.growth === 3) return <GrownPlant />;
    if (gameState.growth === 2) return <Seedling />;
    if (gameState.growth === 1) return <Sprout />;
    if (gameState.seeded) return <Seed />;
    return null;
  };
  
  const getSoilClass = () => {
    switch (gameState.soil) {
      case 'compost': return 'bg-yellow-900/60';
      case 'covered': return 'bg-green-900/40';
      case 'tilled': return 'bg-yellow-700/40';
      case 'damaged': return 'bg-red-900/40';
      default: return 'bg-yellow-800/20';
    }
  }

  const getWaterLevelStyle = () => ({ height: `${gameState.water}%` });

  const getIconForGame = () => {
    switch(game.id) {
        case 'crop-growth': return <Wheat className="h-8 w-8 text-secondary" />;
        case 'pest-control': return <Shield className="h-8 w-8 text-destructive" />;
        case 'water-management': return <Droplets className="h-8 w-8 text-blue-500" />;
        case 'soil-health': return <Tractor className="h-8 w-8 text-yellow-800" />;
        case 'agroforestry': return <Trees className="h-8 w-8 text-green-700" />;
        case 'crop-rotation': return <Repeat className="h-8 w-8 text-indigo-500" />;
        case 'weed-management': return <Scissors className="h-8 w-8 text-orange-500" />;
        case 'composting': return <Recycle className="h-8 w-8 text-lime-600" />;
        default: return <Gamepad2 className="h-8 w-8 text-primary" />;
    }
  }

  const levelTitle = useMemo(() => {
    if (isGameWon) return "Congratulations! You've completed the simulation!";
    if (isGameOver) return "Game Over";
    
    let title = `Stage ${level.level}: ${level.title}`;
    if (game.id === 'crop-rotation') {
      title = `Year ${gameState.year}: ${level.title}`;
    }
    return title;
  }, [isGameWon, isGameOver, level, game.id, gameState.year]);


  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-headline text-3xl">
              {getIconForGame()}
              {game.title}
            </CardTitle>
            <CardDescription>{levelTitle}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className='flex flex-col items-center justify-center bg-muted/50 rounded-lg p-4 border border-dashed'>
            <div className='w-full h-64 relative rounded-md overflow-hidden'>
                <div className='absolute inset-x-0 top-0 h-2/3 bg-blue-200 flex justify-end p-2'>
                    <Sun className="text-yellow-400 w-8 h-8" />
                </div>
                <div className={cn('absolute inset-x-0 bottom-0 h-1/3 transition-colors duration-500', getSoilClass())}>
                   <div className="absolute inset-0 bg-blue-400/30 transition-all" style={getWaterLevelStyle()}></div>
                   {gameState.mulch && <div className='absolute inset-0 bg-yellow-600/40' style={{height: '15%'}}></div>}
                </div>
                
                 <div className='absolute inset-0 flex items-center justify-center'>
                    <svg viewBox="0 0 24 24" className="w-32 h-32" >{getPlantStage()}</svg>
                 </div>
                 {gameState.weeds && (
                    <>
                     <div className='absolute bottom-1/3 left-[30%] text-2xl'><svg viewBox="0 0 24 24" className="w-8 h-8"><path d="M12 18 l-2 -2 m2 2 l2 -2 M10 16 l-1 -2 M14 16 l1 -2" stroke="darkolivegreen" strokeWidth="2" /></svg></div>
                     <div className='absolute bottom-1/3 left-[60%] text-2xl'><svg viewBox="0 0 24 24" className="w-8 h-8"><path d="M12 18 l-2 -2 m2 2 l2 -2 M10 16 l-1 -2 M14 16 l1 -2" stroke="darkolivegreen" strokeWidth="2" /></svg></div>
                    </>
                 )}
                 {gameState.pests && (
                     <div className='absolute bottom-[40%] left-[48%] text-lg'>
                        <Bug className="w-5 h-5 text-gray-900 animate-pulse" />
                     </div>
                 )}
                  {gameState.beneficials > 0 && (
                     <div className='absolute top-[40%] left-[38%] text-lg opacity-70'>
                        <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="4" fill="red" /><circle cx="11" cy="11" r="1" fill="black" /><circle cx="13" cy="11" r="1" fill="black" /></svg>
                     </div>
                 )}
            </div>
            <div className="w-full space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Leaf className="w-4 h-4 text-green-500" />
                    <span>Health:</span>
                    <Progress value={gameState.health} className="w-full h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>Water:</span>
                    <Progress value={gameState.water} className="w-full h-2" />
                </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TestTube className="w-4 h-4 text-purple-500" />
                    <span className="flex gap-2">
                      <span>N: {gameState.nutrients.n}</span>
                      <span>P: {gameState.nutrients.p}</span>
                      <span>K: {gameState.nutrients.k}</span>
                    </span>
                </div>
            </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">{level.description}</p>
          <div className="grid grid-cols-1 gap-3">
            {level.choices.map((choice, index) => (
              <Button
                key={index}
                variant={'outline'}
                onClick={() => handleChoice(choice)}
                disabled={isLevelCompleted || isGameOver || isGameWon}
                className="h-auto min-h-12 justify-start whitespace-normal text-left"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      {(isLevelCompleted || isGameOver || isGameWon) && (
        <CardFooter className="flex flex-col items-start gap-4">
          <div className={cn(
              "w-full rounded-md border p-4 flex gap-4 items-center",
              feedback?.correct ? "bg-primary/10 border-primary/50" : "bg-destructive/10 border-destructive/50"
            )}>
              {feedback?.correct ? <CheckCircle className="text-primary w-6 h-6 shrink-0"/> : <XCircle className="text-destructive w-6 h-6 shrink-0"/>}
            <div>
                <p className="font-semibold">{isGameOver ? "Game Over" : isGameWon ? "Success!" : feedback?.correct ? "Good Choice!" : "Think Again..."}</p>
                <p>{feedback?.text}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isGameWon ? (
                <Button onClick={resetGame}>Play Again</Button>
            ) : isGameOver ? (
                <Button onClick={resetGame} variant="destructive">Restart Game</Button>
            ) : feedback?.correct ? (
                <Button onClick={handleNextLevel}>
                {currentLevelIndex < game.levels.length - 1 ? 'Next Stage' : 'Complete Game'}
                </Button>
            ) : (
                <Button onClick={handleTryAgain} variant="secondary">
                Try Again
                </Button>
            )}
          </div>
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
        case 'agroforestry': return <Trees className="h-5 w-5 text-green-700" />;
        case 'crop-rotation': return <Repeat className="h-5 w-5 text-indigo-500" />;
        case 'weed-management': return <Scissors className="h-5 w-5 text-orange-500" />;
        case 'composting': return <Recycle className="h-5 w-5 text-lime-600" />;
        default: return <Gamepad2 className="h-5 w-5 text-primary" />;
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <Gamepad2 className="h-8 w-8 text-primary" />
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
              className="h-auto flex-col items-start justify-between p-4 text-left group gap-2"
              onClick={() => setSelectedGame(game)}
            >
              <div className="flex items-center gap-2">
                {getIconForGame(game.id)}
                <p className="font-semibold text-primary group-hover:text-accent-foreground">
                  {game.title}
                </p>
              </div>
              <p className="text-sm text-muted-foreground whitespace-normal group-hover:text-accent-foreground/80">{game.description}</p>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

    