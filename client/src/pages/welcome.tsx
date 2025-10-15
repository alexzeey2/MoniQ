import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface WelcomeProps {
  onStartGame: () => void;
}

const PLAYER_DATA_KEY = 'naijaWealthSim_playerData';

export default function Welcome({ onStartGame }: WelcomeProps) {
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [error, setError] = useState('');
  const [isReturningPlayer, setIsReturningPlayer] = useState(false);

  useEffect(() => {
    const savedPlayerData = localStorage.getItem(PLAYER_DATA_KEY);
    if (savedPlayerData) {
      const data = JSON.parse(savedPlayerData);
      if (data.playerName && data.playerCountry) {
        setPlayerName(data.playerName);
        setPlayerCountry(data.playerCountry);
        setIsReturningPlayer(true);
      }
    }
  }, []);

  const handleStartPlaying = () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!playerCountry) {
      setError('Please select your country');
      return;
    }

    const currency = playerCountry === 'Nigeria' ? '₦' : '$';
    const conversionRate = playerCountry === 'Nigeria' ? 1 : 1/1500;

    const playerData = {
      playerName: playerName.trim(),
      playerCountry,
      currency,
      conversionRate
    };

    localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(playerData));
    onStartGame();
  };

  const countries = [
    'Nigeria',
    'United States',
    'United Kingdom',
    'Canada',
    'South Africa',
    'Ghana',
    'Kenya',
    'Australia',
    'India',
    'Germany',
    'France',
    'Brazil',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-10 w-10 text-emerald-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Sọ́ágỌ́
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-semibold">
            Turn Millions into Billions!
          </p>
        </div>

        {/* Returning Player Message */}
        {isReturningPlayer && (
          <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-md p-3 text-center">
            <p className="text-emerald-700 dark:text-emerald-300 font-medium">
              Welcome back, {playerName}! Ready to try again?
            </p>
          </div>
        )}

        {/* Game Information */}
        <div className="space-y-4 text-sm md:text-base">
          <p className="text-center font-medium">Welcome! This game is simple to understand:</p>
          
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-950 rounded-md p-4 space-y-1">
              <p className="font-semibold text-blue-700 dark:text-blue-300">🎯 YOUR MISSION:</p>
              <p className="text-muted-foreground">Buy all 20 luxury items to advance to the next level. Reach Level 10 to master the game!</p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-md p-4 space-y-1">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">💰 HOW TO WIN:</p>
              <p className="text-muted-foreground">Keep investing your money to grow your wealth. Reinvest profits to compound your earnings.</p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950 rounded-md p-4 space-y-1">
              <p className="font-semibold text-orange-700 dark:text-orange-300">⚠️ STAY ALIVE:</p>
              <p className="text-muted-foreground">You MUST maintain enough balance to cover:</p>
              <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                <li>Living Expenses (25% of balance every 30 seconds)</li>
                <li>Item Maintenance (each item has upkeep costs)</li>
              </ul>
              <p className="text-orange-700 dark:text-orange-300 font-medium mt-2">If your balance drops to ₦5M, you lose!</p>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter your name</label>
            <Input
              type="text"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              data-testid="input-player-name"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select your country</label>
            <Select value={playerCountry} onValueChange={(value) => {
              setPlayerCountry(value);
              setError('');
            }}>
              <SelectTrigger data-testid="select-country" className="text-base">
                <SelectValue placeholder="Choose your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <Button
            onClick={handleStartPlaying}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
            data-testid="button-start-playing"
          >
            Start Playing!
          </Button>
        </div>
      </Card>
    </div>
  );
}
