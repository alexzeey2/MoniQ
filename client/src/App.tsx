import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "@/pages/welcome";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const PLAYER_DATA_KEY = 'naijaWealthSim_playerData';

function MainApp() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPlayerData = localStorage.getItem(PLAYER_DATA_KEY);
    if (savedPlayerData) {
      try {
        const data = JSON.parse(savedPlayerData);
        if (data.playerName && data.playerCountry) {
          setShowWelcome(false);
        }
      } catch (error) {
        console.error('Failed to load player data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleStartGame = () => {
    setShowWelcome(false);
  };

  const handleReturnToWelcome = () => {
    setShowWelcome(true);
  };

  if (isLoading) {
    return null;
  }

  if (showWelcome) {
    return <Welcome onStartGame={handleStartGame} />;
  }

  return <Home onReturnToWelcome={handleReturnToWelcome} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
