import { useState, useEffect } from 'react';
import { Home, TrendingUp, ShoppingBag, User, ArrowLeft, Clock, AlertCircle, PieChart, Shield, ShieldOff, Zap, RotateCcw, Play } from 'lucide-react';
import iphoneImg from '@assets/Iphone_15_Pro_Max_1760488588844.png';
import macbookImg from '@assets/MacBook_Pro_M3_1760488589069.png';
import visionProImg from '@assets/Apple_Vision_Pro_1760488588518.png';
import watchImg from '@assets/Luxury_Watch_1760488588988.png';
import mercedesImg from '@assets/Mercedes_G-wagon_1760488589156.png';
import lamborghiniImg from '@assets/Lamborghini_Urus_1760488588886.png';
import rollsRoyceImg from '@assets/Rolls_Royce_1760488589256.png';
import bugattiImg from '@assets/Bugatti_Chiron_1760488588652.png';
import duplexImg from '@assets/Ikoyi_Duplex_1760488588798.png';
import penthouseImg from '@assets/Lekki_Penthouse_1760488588932.png';
import villaImg from '@assets/Banana_Island_Villa_1760488588460.png';
import privateIslandImg from '@assets/Pivate_Island_1760488589208.png';
import cessnaCitationImg from '@assets/Cessna_Citation_1760488588702.png';
import bombardierImg from '@assets/Bombardier_Global_1760488588599.png';
import gulfstreamImg from '@assets/Gulfstream_G650_1760488588748.png';
import boeingJetImg from '@assets/Boeing_Jet_1760488588557.png';
import sportYachtImg from '@assets/Sport_Yacht_1760488589297.png';
import luxuryYachtImg from '@assets/Luxury_Yacht_1760488589022.png';
import megaYachtImg from '@assets/Mega_Yacht_1760488589112.png';
import superyachtImg from '@assets/Superyacht_1760488589340.png';
import kaChingSound from '@assets/cashier-quotka-chingquot-sound-effect-129698_1760655284960.mp3';

// Sound effect utilities
const playKaChing = () => {
  const audio = new Audio(kaChingSound);
  audio.volume = 0.5;
  audio.play().catch(err => console.log('Audio play failed:', err));
};

const playDeposit = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 400;
  oscillator.type = 'sine';
  
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0.2, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
  
  oscillator.start(now);
  oscillator.stop(now + 0.15);
};

interface NaijaWealthSimProps {
  onReturnToWelcome: () => void;
}

export default function NaijaWealthSim({ onReturnToWelcome }: NaijaWealthSimProps) {
  // Player data
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('Nigeria');
  const [currency, setCurrency] = useState('₦');
  const [conversionRate, setConversionRate] = useState(1);

  const [screen, setScreen] = useState('home');
  const [balance, setBalance] = useState(50000000);
  const [investments, setInvestments] = useState<Array<{id: number, a: number, t: number, r: number}>>([]);
  const [owned, setOwned] = useState<Array<any>>([]);
  const [taxTimer, setTaxTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [taxRate] = useState(0.25);
  const [maintenance, setMaintenance] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [purchased, setPurchased] = useState<number[]>([]);
  const [accountManager, setAccountManager] = useState(false);
  const [managerCost, setManagerCost] = useState(20000000);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [returnRate, setReturnRate] = useState(0.30);
  const [decayTimer, setDecayTimer] = useState(420);
  const [adTimer, setAdTimer] = useState(60);
  const [showGuide, setShowGuide] = useState(false);
  const [showAdSimulation, setShowAdSimulation] = useState(false);
  const [adCountdown, setAdCountdown] = useState(30);
  
  // Tutorial state
  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [showTutorialWelcome, setShowTutorialWelcome] = useState(false);
  const [tutorialInvestmentMade, setTutorialInvestmentMade] = useState(false);
  const [tutorialFirstPurchase, setTutorialFirstPurchase] = useState(false);
  const [tutorialSecondPurchase, setTutorialSecondPurchase] = useState(false);
  const [previousReturnRate, setPreviousReturnRate] = useState(0.30);
  const [showZeroRateWarning, setShowZeroRateWarning] = useState(false);

  const STORAGE_KEY = 'naijaWealthSim_gameState';
  const TUTORIAL_KEY = 'naijaWealthSim_tutorialCompleted';
  const PLAYER_DATA_KEY = 'naijaWealthSim_playerData';

  const saveGameState = () => {
    const gameState = {
      balance,
      investments,
      owned,
      purchased,
      returnRate,
      accountManager,
      managerCost,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  };

  const loadGameState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const gameState = JSON.parse(saved);
        setBalance(gameState.balance ?? 50000000);
        setInvestments(gameState.investments ?? []);
        setOwned(gameState.owned ?? []);
        setPurchased(gameState.purchased ?? []);
        setReturnRate(gameState.returnRate ?? 0.30);
        setAccountManager(gameState.accountManager ?? false);
        setManagerCost(gameState.managerCost ?? 20000000);
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  };

  const checkTutorial = () => {
    const completed = localStorage.getItem(TUTORIAL_KEY);
    if (!completed) {
      setShowTutorialWelcome(true);
    } else {
      setTutorialCompleted(true);
    }
  };

  const startTutorial = () => {
    setShowTutorialWelcome(false);
    setTutorialActive(true);
    setTutorialStep(1);
  };

  const skipTutorial = () => {
    setShowTutorialWelcome(false);
    setTutorialActive(false);
    setTutorialStep(0);
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setTutorialCompleted(true);
  };

  const completeTutorial = () => {
    setTutorialActive(false);
    setTutorialStep(0);
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setTutorialCompleted(true);
  };

  const items = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 2500000, cat: 'Gadgets', img: iphoneImg, m: 50000 },
    { id: 2, name: 'MacBook Pro M3', price: 4800000, cat: 'Gadgets', img: macbookImg, m: 80000 },
    { id: 3, name: 'Apple Vision Pro', price: 6500000, cat: 'Gadgets', img: visionProImg, m: 120000 },
    { id: 4, name: 'Luxury Watch', price: 25000000, cat: 'Gadgets', img: watchImg, m: 300000 },
    { id: 6, name: 'Mercedes G-Wagon', price: 120000000, cat: 'Cars', img: mercedesImg, m: 1500000 },
    { id: 7, name: 'Lamborghini Urus', price: 250000000, cat: 'Cars', img: lamborghiniImg, m: 3000000 },
    { id: 8, name: 'Rolls Royce', price: 450000000, cat: 'Cars', img: rollsRoyceImg, m: 5500000 },
    { id: 9, name: 'Bugatti Chiron', price: 850000000, cat: 'Cars', img: bugattiImg, m: 10000000 },
    { id: 10, name: 'Ikoyi Duplex', price: 380000000, cat: 'Houses', img: duplexImg, m: 4000000 },
    { id: 11, name: 'Lekki Penthouse', price: 650000000, cat: 'Houses', img: penthouseImg, m: 7000000 },
    { id: 12, name: 'Banana Island Villa', price: 1200000000, cat: 'Houses', img: villaImg, m: 12000000 },
    { id: 13, name: 'Private Island', price: 3500000000, cat: 'Houses', img: privateIslandImg, m: 35000000 },
    { id: 14, name: 'Cessna Citation', price: 1800000000, cat: 'Jets', img: cessnaCitationImg, m: 18000000 },
    { id: 15, name: 'Bombardier Global', price: 3200000000, cat: 'Jets', img: bombardierImg, m: 32000000 },
    { id: 16, name: 'Gulfstream G650', price: 5500000000, cat: 'Jets', img: gulfstreamImg, m: 55000000 },
    { id: 17, name: 'Boeing Jet', price: 12000000000, cat: 'Jets', img: boeingJetImg, m: 120000000 },
    { id: 18, name: 'Sport Yacht', price: 2500000000, cat: 'Yachts', img: sportYachtImg, m: 25000000 },
    { id: 19, name: 'Luxury Yacht', price: 4800000000, cat: 'Yachts', img: luxuryYachtImg, m: 48000000 },
    { id: 20, name: 'Mega Yacht', price: 9500000000, cat: 'Yachts', img: megaYachtImg, m: 95000000 },
    { id: 21, name: 'Superyacht', price: 18000000000, cat: 'Yachts', img: superyachtImg, m: 180000000 },
  ];

  const categories = ['All', 'Gadgets', 'Cars', 'Houses', 'Jets', 'Yachts'];

  useEffect(() => {
    loadGameState();
    checkTutorial();
    
    // Load player data
    const savedPlayerData = localStorage.getItem(PLAYER_DATA_KEY);
    if (savedPlayerData) {
      try {
        const data = JSON.parse(savedPlayerData);
        setPlayerName(data.playerName || '');
        setPlayerCountry(data.playerCountry || 'Nigeria');
        setCurrency(data.currency || '₦');
        setConversionRate(data.conversionRate || 1);
      } catch (error) {
        console.error('Failed to load player data:', error);
      }
    }
  }, []);

  useEffect(() => {
    saveGameState();
  }, [balance, investments, owned, purchased, returnRate, accountManager, managerCost]);

  useEffect(() => {
    setMaintenance(owned.reduce((s, i) => s + i.m, 0));
  }, [owned]);

  useEffect(() => {
    if (gameOver || accountManager || tutorialActive) return;
    const t = setInterval(() => {
      setDecayTimer(p => {
        if (p <= 1) {
          // After 7 minutes (420 seconds), drop rate to 0% instantly
          setReturnRate(0);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [gameOver, accountManager, tutorialActive]);

  // Show/hide warning popup based on profit rate
  useEffect(() => {
    if (returnRate === 0 && !gameOver && !accountManager) {
      setShowZeroRateWarning(true);
    } else if (returnRate > 0) {
      setShowZeroRateWarning(false);
    }
  }, [returnRate, gameOver, accountManager]);

  useEffect(() => {
    if (gameOver || accountManager || tutorialActive) return;
    const t = setInterval(() => {
      setAdTimer(p => {
        if (p <= 1) {
          setShowAd(true);
          setTimeout(() => setShowAd(false), 5000);
          return 60;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [gameOver, accountManager, tutorialActive]);

  useEffect(() => {
    if (gameOver || accountManager || tutorialActive) return;
    const t = setInterval(() => {
      setTaxTimer(p => {
        if (p <= 1) {
          const tax = Math.floor(balance * taxRate);
          const total = tax + maintenance;
          const newBal = Math.max(5000000, balance - total);
          setBalance(newBal);
          if (newBal <= 5000000) setGameOver(true);
          return 30;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [balance, gameOver, taxRate, maintenance, accountManager, tutorialActive]);

  useEffect(() => {
    if (accountManager) return;
    const t = setInterval(() => {
      setInvestments(p => p.map(inv => {
        if (inv.t <= 1) {
          setBalance(b => b + Math.floor(inv.a * (1 + inv.r)));
          playKaChing(); // Ka-ching sound when investment returns!
          return null;
        }
        return { ...inv, t: inv.t - 1 };
      }).filter(Boolean) as Array<{id: number, a: number, t: number, r: number}>);
    }, 1000);
    return () => clearInterval(t);
  }, [accountManager]);

  useEffect(() => {
    if (showAdSimulation && adCountdown > 0) {
      const timer = setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showAdSimulation, adCountdown]);


  // Tutorial progression effects
  useEffect(() => {
    // Step 2: Wait for 40M investment
    if (tutorialActive && tutorialStep === 2 && investments.some(inv => inv.a === 40000000)) {
      setTutorialInvestmentMade(true);
    }
  }, [tutorialActive, tutorialStep, investments]);

  useEffect(() => {
    // Step 3: Detect returnRate drop from 30% to 20%
    if (!tutorialActive && !tutorialCompleted && returnRate === 0.20 && previousReturnRate === 0.30 && !tutorialFirstPurchase) {
      setTutorialActive(true);
      setTutorialStep(3);
    }
  }, [tutorialActive, tutorialCompleted, returnRate, previousReturnRate, tutorialFirstPurchase]);

  useEffect(() => {
    // Step 4: Wait for first purchase (iPhone - id 1)
    if (tutorialActive && tutorialStep === 4 && purchased.includes(1)) {
      setTutorialFirstPurchase(true);
      setTimeout(() => {
        setTutorialStep(5);
      }, 2000);
    }
  }, [tutorialActive, tutorialStep, purchased]);

  useEffect(() => {
    // Step 6: Wait for second purchase (MacBook - id 2) or skip
    if (tutorialActive && tutorialStep === 6 && (purchased.includes(2) || tutorialSecondPurchase)) {
      setTutorialSecondPurchase(true);
      setTimeout(() => {
        setTutorialStep(7);
        setScreen('home');
      }, 2000);
    }
  }, [tutorialActive, tutorialStep, purchased, tutorialSecondPurchase]);

  const fmt = (n: number) => {
    const convertedAmount = Math.round(n * conversionRate);
    return `${currency}${new Intl.NumberFormat('en-US').format(convertedAmount)}`;
  };
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const invest = (amt: number) => {
    const a = parseInt(amt.toString());
    if (a > balance || a < 1000000 || (balance - a) < 5000000) return;
    setBalance(balance - a);
    setInvestments([...investments, { id: Date.now(), a, t: 60, r: returnRate }]);
    playDeposit(); // Sound effect for making an investment
  };

  const buy = (item: any) => {
    const cost = Math.floor(item.price * 1.25);
    if (cost > balance || (balance - cost) < 5000000) return;
    setBalance(balance - cost);
    setOwned([...owned, { ...item, price: item.price, m: item.m }]);
    setPurchased([...purchased, item.id]);
    setReturnRate(0.30);
    setDecayTimer(420);
  };

  const toggleManager = () => {
    if (!accountManager && balance >= managerCost + 5000000) {
      setBalance(balance - managerCost);
      setAccountManager(true);
      setManagerCost(Math.floor(managerCost * 1.50));
    } else {
      setAccountManager(false);
    }
  };

  const handleRestart = () => {
    // Clear game data but keep player data
    localStorage.removeItem(STORAGE_KEY);
    setGameOver(false);
    setShowAdSimulation(false);
    
    // Return to welcome page (player data will be pre-filled)
    onReturnToWelcome();
  };

  const changePlayer = () => {
    // Clear both game data and player data
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PLAYER_DATA_KEY);
    
    // Return to welcome page
    onReturnToWelcome();
  };

  const handleContinueWithAd = () => {
    setShowAdSimulation(true);
    setAdCountdown(30);
  };

  const handleAdComplete = () => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.a, 0);
    const recoveredFunds = Math.floor(totalInvested * 0.5);
    
    setBalance(prev => prev + recoveredFunds);
    setOwned([]);
    setPurchased([]);
    setInvestments([]);
    setMaintenance(0);
    
    setShowAdSimulation(false);
    setGameOver(false);
    setAdCountdown(30);
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20" style={{ paddingBottom: showAd ? '180px' : '80px' }}>
        {screen === 'home' && (
          <div className="p-6 space-y-4">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground shadow-lg">
              <div className="mb-3">
                <div className="text-sm opacity-80 mb-1">Balance</div>
                <div className="text-3xl font-bold" data-testid="text-balance">{fmt(balance)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2">
                  <Clock className="w-4 h-4" />
                  <span>{accountManager ? 'Paused' : `Living Expenses ${taxTimer}s`}</span>
                </div>
                <button 
                  onClick={toggleManager} 
                  className={`px-3 py-2 rounded-lg ${accountManager ? 'bg-primary/50' : 'bg-white/20'}`}
                  data-testid="button-toggle-manager"
                >
                  {accountManager ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!accountManager && (
              <div className="bg-chart-2/10 border border-chart-2/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">👨‍💼</div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">Account Manager</div>
                    <div className="text-muted-foreground text-xs mt-1 mb-2">
                      Pause all timers. Cost: {fmt(managerCost)} (+50% each use)
                    </div>
                    <button
                      onClick={toggleManager}
                      disabled={balance < managerCost + 5000000}
                      className="bg-chart-2 text-white px-4 py-2 rounded-lg text-xs font-medium disabled:opacity-50 hover-elevate active-elevate-2"
                      data-testid="button-activate-manager"
                    >
                      Activate ({fmt(managerCost)})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {accountManager && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">Protected</div>
                    <div className="text-muted-foreground text-xs mt-1 mb-2">
                      All timers paused. Next: {fmt(managerCost)}
                    </div>
                    <button 
                      onClick={toggleManager} 
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-medium hover-elevate active-elevate-2"
                      data-testid="button-deactivate-manager"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-chart-5/10 border border-chart-5/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-chart-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-sm">Living Expenses</div>
                  <div className="text-muted-foreground text-xs mt-1">
                    25% of balance deducted every 30s. Keep above {currency}{Math.round(5000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}!
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-chart-5/10 rounded-xl p-4 border border-chart-5/20">
              <div className="text-sm font-semibold text-foreground mb-3">Next Expenses (in {taxTimer}s)</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1. Food & Dining:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.16))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">2. Clothing & Fashion:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.08))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3. Entertainment:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.12))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4. Travel:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.12))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">5. Transportation:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.20))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">6. Family Support:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.20))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">7. Emergency Fund:</span>
                  <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.12))}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-chart-5/30">
                  <span className="text-foreground font-medium">Total Living Expenses:</span>
                  <span className="font-bold">-{fmt(Math.floor(balance * taxRate))}</span>
                </div>
                {maintenance > 0 && (
                  <div className="flex justify-between pt-1">
                    <span className="text-foreground font-medium">+ Maintenance:</span>
                    <span className="font-bold">-{fmt(maintenance)}</span>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowGuide(true)} 
              className="w-full bg-gradient-to-r from-chart-2 to-chart-3 text-white rounded-xl p-4 shadow flex items-center justify-between hover-elevate active-elevate-2"
              data-testid="button-show-guide"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2 text-2xl">📚</div>
                <div className="text-left">
                  <div className="font-bold">How to Play</div>
                  <div className="text-sm opacity-90">Learn the game & win strategies</div>
                </div>
              </div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        
        {screen === 'invest' && (
          <div className="p-6 space-y-4">
            <button 
              onClick={() => setScreen('home')} 
              className="flex items-center gap-2 text-muted-foreground hover-elevate active-elevate-2 rounded-lg px-2 py-1"
              data-testid="button-back-invest"
            >
              <ArrowLeft className="w-5 h-5" />Back
            </button>
            <h2 className="text-2xl font-bold">Investment</h2>
            <div className="bg-gradient-to-br from-chart-2 to-chart-2/80 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-80">Balance</div>
              <div className="text-3xl font-bold mb-2">{fmt(balance)}</div>
              <div className="text-sm">Returns: {(returnRate * 100).toFixed(0)}%</div>
            </div>
            
            {/* Investment Summary */}
            <div className="bg-chart-2/10 rounded-xl p-4 border border-chart-2/20">
              <div className="text-sm font-semibold text-foreground mb-2">Investment Summary</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Invested</span>
                  <span className="font-semibold">{fmt(investments.reduce((s, i) => s + i.a, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Returns</span>
                  <span className="font-semibold text-primary">+{fmt(investments.reduce((s, i) => s + Math.floor(i.a * i.r), 0))}</span>
                </div>
              </div>
            </div>

            {returnRate === 0 && (
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <div className="font-semibold text-destructive text-sm mb-1">Cannot Invest!</div>
                    <div className="text-xs text-muted-foreground">
                      Your profit rate has reached 0%. You must buy an item from the Store to restore your investment ability.
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {[1000000, 10000000, 40000000, 100000000].map(a => (
                <button 
                  key={a} 
                  onClick={() => invest(a)} 
                  disabled={returnRate === 0 || a > balance || (balance - a) < 5000000} 
                  className="py-6 font-semibold bg-card border-2 border-card-border rounded-xl disabled:opacity-50 hover-elevate active-elevate-2"
                  data-testid={`button-invest-${a}`}
                >
                  {currency}{Math.round(a * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}
                </button>
              ))}
            </div>

            {/* Investment History */}
            {investments.map(inv => (
              <div key={inv.id} className="bg-card rounded-xl p-4 border border-card-border" data-testid={`investment-${inv.id}`}>
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Investment</div>
                    <div className="font-semibold">{fmt(inv.a)}</div>
                  </div>
                  <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">+{(inv.r * 100).toFixed(0)}%</div>
                </div>
                <div className="text-sm text-muted-foreground">{accountManager ? 'Paused' : `${inv.t}s`}</div>
              </div>
            ))}
          </div>
        )}

        {screen === 'luxury' && (
          <div className="p-6 space-y-4">
            <button 
              onClick={() => setScreen('home')} 
              className="flex items-center gap-2 text-muted-foreground hover-elevate active-elevate-2 rounded-lg px-2 py-1"
              data-testid="button-back-store"
            >
              <ArrowLeft className="w-5 h-5" />Back
            </button>
            <h2 className="text-2xl font-bold">Store</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)} 
                  className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-chart-3 text-white' : 'bg-muted text-foreground hover-elevate active-elevate-2'}`}
                  data-testid={`button-category-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {items.filter(i => !purchased.includes(i.id) && (selectedCategory === 'All' || i.cat === selectedCategory)).map(i => {
                const totalCost = Math.floor(i.price * 1.25);
                
                return (
                  <div key={i.id} className="bg-card rounded-xl overflow-hidden border border-card-border" data-testid={`item-${i.id}`}>
                    <img 
                      src={i.img} 
                      alt={i.name}
                      className="w-full h-64 object-cover shadow-lg"
                    />
                    <div className="p-4 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{i.name}</div>
                        <div className="font-bold text-lg mb-1">{fmt(totalCost)}</div>
                        <div className="text-xs text-chart-5">-{fmt(i.m)}/30s</div>
                      </div>
                      <button 
                        onClick={() => buy(i)} 
                        disabled={balance < totalCost} 
                        className="bg-chart-3 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover-elevate active-elevate-2 whitespace-nowrap"
                        data-testid={`button-buy-${i.id}`}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {screen === 'portfolio' && (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2">Portfolio</h2>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
              <div className="text-sm opacity-80 mb-1">Expected Net Worth</div>
              <div className="text-3xl font-bold">{fmt(balance + investments.reduce((s, i) => s + i.a, 0) + investments.reduce((s, i) => s + Math.floor(i.a * i.r), 0) - Math.floor(balance * taxRate) - maintenance)}</div>
            </div>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-card-border">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Balance</span>
                  <span className="font-bold">{fmt(balance)}</span>
                </div>
              </div>
              <div className="bg-chart-2/10 rounded-xl p-4 border border-chart-2/20">
                <div className="text-sm font-semibold text-foreground mb-2">Investments</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invested</span>
                    <span className="font-semibold">{fmt(investments.reduce((s, i) => s + i.a, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Returns</span>
                    <span className="font-semibold text-primary">+{fmt(investments.reduce((s, i) => s + Math.floor(i.a * i.r), 0))}</span>
                  </div>
                </div>
              </div>
              <div className="bg-chart-5/10 rounded-xl p-4 border border-chart-5/20">
                <div className="text-sm font-semibold text-foreground mb-3">Next Expenses (in {taxTimer}s)</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1. Food & Dining:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.16))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2. Clothing & Fashion:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.08))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">3. Entertainment:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.12))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">4. Travel:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.12))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">5. Transportation:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.20))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">6. Family Support:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.20))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7. Emergency Fund:</span>
                    <span className="font-semibold">{fmt(Math.floor(balance * taxRate * 0.12))}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-chart-5/30">
                    <span className="text-foreground font-medium">Total Living Expenses:</span>
                    <span className="font-bold">-{fmt(Math.floor(balance * taxRate))}</span>
                  </div>
                  {maintenance > 0 && (
                    <div className="flex justify-between pt-1">
                      <span className="text-foreground font-medium">+ Maintenance:</span>
                      <span className="font-bold">-{fmt(maintenance)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'profile' && (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            
            {/* Player Info Card */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl p-4 border border-emerald-200/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Player</div>
                  <div className="text-lg font-bold">{playerName}</div>
                  <div className="text-sm text-muted-foreground">{playerCountry} • {currency}</div>
                </div>
                <button
                  onClick={changePlayer}
                  className="px-3 py-1.5 bg-muted hover-elevate active-elevate-2 rounded-lg text-sm font-medium"
                  data-testid="button-change-player"
                >
                  Change Player
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-muted to-muted/80 rounded-2xl p-6 text-foreground">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/40 to-primary rounded-full flex items-center justify-center text-2xl">
                  {balance >= 1000000000 ? '👑' : balance >= 500000000 ? '💎' : '⭐'}
                </div>
                <div>
                  <div className="text-xl font-bold">Wealth Builder</div>
                  <div className="text-sm text-muted-foreground">{balance >= 1000000000 ? 'Billionaire' : balance >= 500000000 ? 'Multi-Millionaire' : 'Millionaire'}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Net Worth</div>
              <div className="text-3xl font-bold mb-3">{fmt(balance)}</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-card/30 rounded-lg p-2">
                  <div className="text-muted-foreground">Profit Rate</div>
                  <div className="font-bold text-lg">{(returnRate * 100).toFixed(0)}%</div>
                </div>
                <div className="bg-card/30 rounded-lg p-2">
                  <div className="text-muted-foreground">Items</div>
                  <div className="font-bold text-lg">{owned.length}/20</div>
                </div>
                <div className="bg-card/30 rounded-lg p-2">
                  <div className="text-muted-foreground">Investments</div>
                  <div className="font-bold text-lg">{investments.length}</div>
                </div>
                <div className="bg-card/30 rounded-lg p-2">
                  <div className="text-muted-foreground">Maintenance</div>
                  <div className="font-bold text-lg">{fmt(maintenance)}</div>
                </div>
              </div>
            </div>
            <div className="font-semibold mb-3">Luxury Collection ({owned.length})</div>
            {owned.length === 0 ? (
              <div className="bg-muted/30 rounded-xl p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                <div className="text-muted-foreground text-sm">No items yet</div>
                <p className="text-xs text-muted-foreground/70 mt-2">Visit store to start collecting</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {owned.map((i, idx) => (
                  <div key={idx} className="bg-card rounded-xl overflow-hidden border border-card-border">
                    <img 
                      src={i.img} 
                      alt={i.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3 text-center">
                      <div className="text-sm font-semibold">{i.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{fmt(i.price)}</div>
                      <div className="text-xs text-chart-5 mt-1">-{fmt(i.m)}/30s</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Banner Ad */}
      <div className={`fixed left-0 right-0 max-w-md mx-auto bg-card border-t shadow-lg transition-all duration-300 ${showAd ? 'bottom-16' : '-bottom-32'}`} style={{ zIndex: 40 }}>
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-muted-foreground">AD</span>
            <button onClick={() => setShowAd(false)} data-testid="button-close-banner-ad">✕</button>
          </div>
          <div className="bg-gradient-to-r from-chart-2 to-chart-3 rounded-lg p-6 text-white text-center">
            <div className="text-xl font-bold">Premium App</div>
            <div className="text-sm mb-3">50% returns</div>
            <button className="bg-white text-chart-2 px-6 py-2 rounded-full font-semibold text-sm hover-elevate active-elevate-2">Learn More</button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto" style={{ zIndex: 50 }}>
        <div className="flex justify-around py-3">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'invest', icon: TrendingUp, label: 'Invest' },
            { id: 'luxury', icon: ShoppingBag, label: 'Store' },
            { id: 'portfolio', icon: PieChart, label: 'Portfolio' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(({ id, icon: Icon, label }) => {
            const isHighlighted = tutorialActive && ((tutorialStep === 1 && id === 'invest'));
            const isDisabled = tutorialActive && tutorialStep === 1 && id !== 'invest';
            
            return (
              <button 
                key={id} 
                onClick={() => {
                  if (isDisabled) return;
                  setScreen(id);
                  if (tutorialActive && tutorialStep === 1 && id === 'invest') {
                    setTutorialStep(2);
                  }
                }}
                className={`flex flex-col items-center gap-1 transition-colors relative ${
                  screen === id ? 'text-primary' : 
                  isDisabled ? 'text-muted-foreground/30' : 
                  'text-muted-foreground'
                } ${isHighlighted ? 'animate-pulse' : ''}`}
                style={isHighlighted ? { zIndex: 100 } : undefined}
                data-testid={`nav-${id}`}
                disabled={isDisabled}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
                {isHighlighted && (
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </nav>


      {/* Zero Rate Warning Modal */}
      {showZeroRateWarning && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6" style={{ zIndex: 60 }}>
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full border-2 border-destructive">
            <div className="text-6xl mb-4 text-center">⚠️</div>
            <h2 className="text-2xl font-bold mb-2 text-center text-destructive">Investment Blocked!</h2>
            <p className="text-sm text-center text-muted-foreground mb-6">
              Your profit rate has reached 0% after 7 minutes. You cannot make any new investments until you buy an item from the Store to restore your investment power.
            </p>

            <div className="bg-chart-5/20 border border-chart-5/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <ShoppingBag className="w-5 h-5 text-chart-5 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-sm mb-1">What to do:</div>
                  <div className="text-xs text-muted-foreground">
                    Visit the Store and purchase any item. This will reset your profit rate back to 30% and unlock investments again.
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowZeroRateWarning(false);
                setScreen('luxury');
              }}
              className="w-full bg-gradient-to-r from-chart-3 to-chart-5 text-white py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
              data-testid="button-go-to-store"
            >
              Go to Store
            </button>
            <button 
              onClick={() => setShowZeroRateWarning(false)}
              className="w-full mt-3 bg-muted text-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
              data-testid="button-close-warning"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && !showAdSimulation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6" style={{ zIndex: 60 }}>
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full border border-card-border">
            <div className="text-6xl mb-4 text-center">💸</div>
            <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Game Over!</h2>
            <p className="text-sm text-center text-muted-foreground mb-6">
              Your balance dropped below {currency}{Math.round(5000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}. Choose your next move:
            </p>

            {/* Consequence Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔄</div>
                <div className="font-semibold text-sm text-foreground mb-1">Restart</div>
                <div className="text-xs text-destructive">Start fresh with {currency}{Math.round(50000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}</div>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">📺</div>
                <div className="font-semibold text-sm text-foreground mb-1">Continue (Ad)</div>
                <div className="text-xs text-primary">Watch 30s ad • Keep 50% of investments • Lose all items</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 bg-destructive text-destructive-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                data-testid="button-restart"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </button>
              <button 
                onClick={handleContinueWithAd}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                data-testid="button-continue-ad"
              >
                <Play className="w-4 h-4" />
                Continue (Ad)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Simulation Screen */}
      {showAdSimulation && (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-4" style={{ zIndex: 70 }}>
          <div className="max-w-md w-full">
            {/* Ad Container */}
            <div className="relative aspect-video bg-gradient-to-r from-chart-2 to-chart-3 rounded-xl overflow-hidden shadow-2xl">
              {/* Ad Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="text-6xl mb-4">🎬</div>
                <div className="text-xl font-bold mb-2">Premium Feature</div>
                <div className="text-sm opacity-80">Unlock exclusive benefits</div>
              </div>

              {/* Countdown Timer or Skip Button */}
              {adCountdown > 0 ? (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full">
                  <div className={`text-white text-lg font-bold tabular-nums ${adCountdown <= 5 ? 'animate-pulse' : ''}`}>
                    0:{adCountdown.toString().padStart(2, '0')}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAdComplete}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-foreground px-4 py-2 rounded-full font-semibold shadow-lg transition-all hover:scale-105"
                  data-testid="button-skip-ad"
                >
                  Skip ✕
                </button>
              )}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-linear"
                  style={{ width: `${((30 - adCountdown) / 30) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Ad Info Text */}
            <div className="text-center mt-4 text-white/60 text-sm">
              {adCountdown > 0 ? `You can skip in ${adCountdown} seconds` : 'Click Skip to continue'}
            </div>
          </div>
        </div>
      )}

      {/* How to Play Guide */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4" style={{ zIndex: 60 }}>
          <div className="bg-card rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col border border-card-border">
            <div className="p-6 border-b border-border flex justify-between">
              <h2 className="text-2xl font-bold">How to Play 🎮</h2>
              <button onClick={() => setShowGuide(false)} data-testid="button-close-guide">✕</button>
            </div>
            <div className="overflow-y-auto p-6 space-y-4 text-sm">
              <div>
                <div className="font-bold text-lg mb-2">🎯 Game Objective</div>
                <p className="text-muted-foreground mb-2">Build your wealth by buying ALL 20 luxury items!</p>
                <p className="text-muted-foreground">Start: {currency}{Math.round(50000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'} | Lose if balance drops below {currency}{Math.round(5000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}</p>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-2">💰 How to Invest</div>
                <p className="text-muted-foreground mb-2">1. Go to <strong>Invest</strong> page</p>
                <p className="text-muted-foreground mb-2">2. Choose investment amount</p>
                <p className="text-muted-foreground mb-2">3. Wait 60 seconds</p>
                <p className="text-muted-foreground">4. Receive 30% profit automatically!</p>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-2">⚡ Profit Rate System</div>
                <p className="text-muted-foreground mb-2">Your profit rate starts at <strong>30%</strong> and stays there for <strong>7 minutes</strong>.</p>
                <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-3 mt-2">
                  <p className="text-destructive text-xs font-semibold mb-1">⚠️ CRITICAL:</p>
                  <p className="text-destructive text-xs">After 7 minutes, your profit rate drops to <strong>0% instantly</strong>. You CANNOT invest when rate is 0%!</p>
                </div>
                <div className="bg-primary/20 border border-primary/30 rounded-lg p-2 mt-2 text-xs">
                  <strong>Solution:</strong> Buy ANY item from the Store to reset your profit back to 30% and restart the 7-minute timer!
                </div>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-2">🏆 Winning Goal</div>
                <p className="text-muted-foreground mb-2">• Collect ALL 20 luxury items to win!</p>
                <p className="text-muted-foreground mb-2">• Keep your balance above the minimum</p>
                <p className="text-muted-foreground">• Manage investments and expenses wisely</p>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-2">💡 Winning Strategy</div>
                <p className="text-muted-foreground">• <strong>Invest fast:</strong> 30% returns for 7 minutes!</p>
                <p className="text-muted-foreground">• <strong>Before 7 mins:</strong> Buy a cheap item to reset profit timer</p>
                <p className="text-muted-foreground">• <strong>Use Account Manager:</strong> Pause timers when needed ({currency}{Math.round(20000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'})</p>
                <p className="text-muted-foreground">• <strong>Watch your balance:</strong> Living expenses take 25% every 30s</p>
                <p className="text-muted-foreground">• <strong>Never hit 0% profit:</strong> You can't invest = guaranteed loss!</p>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <button 
                onClick={() => setShowGuide(false)} 
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                data-testid="button-start-playing"
              >
                Let's Get Rich! 💰
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TUTORIAL: Welcome Modal (Step 1) */}
      {showTutorialWelcome && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6" style={{ zIndex: 100 }}>
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full border border-card-border">
            <div className="text-6xl mb-4 text-center">🎮</div>
            <h2 className="text-2xl font-bold mb-3 text-center">Welcome to Naija Wealth Sim!</h2>
            <p className="text-center text-muted-foreground mb-6">
              Let's learn how to play. Follow the guide and become a wealth master!
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={startTutorial}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                data-testid="button-start-tutorial"
              >
                Start Tutorial
              </button>
              <button 
                onClick={skipTutorial}
                className="w-full bg-muted text-muted-foreground py-2 rounded-xl text-sm hover-elevate active-elevate-2"
                data-testid="button-skip-tutorial"
              >
                Skip Tutorial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TUTORIAL: Tutorial Overlay & Tooltips */}
      {tutorialActive && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60" style={{ zIndex: 90 }} />
          
          {/* Skip Button */}
          <button 
            onClick={skipTutorial}
            className="fixed top-4 right-4 bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm hover-elevate active-elevate-2"
            style={{ zIndex: 100 }}
            data-testid="button-skip-tutorial-active"
          >
            Skip Tutorial
          </button>

          {/* Step 2: Investment Guide */}
          {tutorialStep === 1 && (
            <div className="fixed inset-0 flex items-center justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-2xl p-6 max-w-sm w-full border border-primary shadow-2xl">
                <div className="text-4xl mb-3 text-center">💰</div>
                <h3 className="text-xl font-bold mb-2 text-center">Make Your First Investment</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Click the "Invest" button below to start making money!
                </p>
                <div className="text-sm text-center bg-chart-2/20 border border-chart-2/30 rounded-lg p-3">
                  👇 Look for the <strong className="text-primary">Invest</strong> button in the navigation bar
                </div>
              </div>
            </div>
          )}

          {/* Step 2 continued: After clicking Invest, show investment amount guide */}
          {tutorialStep === 2 && screen === 'invest' && !tutorialInvestmentMade && (
            <div className="fixed inset-0 flex items-center justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-2xl p-6 max-w-sm w-full border border-primary shadow-2xl">
                <div className="text-4xl mb-3 text-center">🎯</div>
                <h3 className="text-xl font-bold mb-2 text-center">Invest {currency}{Math.round(40000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'} Now!</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Tap the <strong>{currency}{Math.round(40000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}</strong> button and wait 60 seconds for 30% profit!
                </p>
                <div className="text-sm text-center bg-chart-3/20 border border-chart-3/30 rounded-lg p-3">
                  ⏱️ Investments mature in 60 seconds with <strong className="text-primary">30% returns!</strong>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 waiting: Investment made, waiting for returns */}
          {tutorialStep === 2 && tutorialInvestmentMade && (
            <div className="fixed bottom-24 left-0 right-0 flex justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-xl p-4 border border-primary shadow-2xl max-w-sm">
                <p className="text-center text-sm">
                  ✅ Great! Now wait for your returns... ⏱️
                  <br />
                  <span className="text-muted-foreground text-xs">Tutorial will continue automatically</span>
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Decay Warning */}
          {tutorialStep === 3 && (
            <div className="fixed inset-0 flex items-center justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-2xl p-6 max-w-sm w-full border border-chart-5 shadow-2xl">
                <div className="text-5xl mb-3 text-center">⚠️</div>
                <h3 className="text-xl font-bold mb-2 text-center text-chart-5">Profit Rate Dropped!</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Your profit rate dropped to <strong className="text-destructive">20%</strong>! 
                  Buy an item to restore it to <strong className="text-primary">30%</strong>!
                </p>
                <button
                  onClick={() => { setTutorialStep(4); setScreen('luxury'); }}
                  className="w-full bg-chart-5 text-white py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                  data-testid="button-tutorial-go-store"
                >
                  Go to Store
                </button>
              </div>
            </div>
          )}

          {/* Step 4: First Purchase Guide */}
          {tutorialStep === 4 && screen === 'luxury' && !tutorialFirstPurchase && (
            <div className="fixed bottom-24 left-0 right-0 flex justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-xl p-6 border border-primary shadow-2xl max-w-sm">
                <div className="text-3xl mb-2 text-center">👆</div>
                <p className="text-center text-sm font-semibold mb-2">Buy the iPhone!</p>
                <p className="text-center text-xs text-muted-foreground">
                  Purchase the <strong>iPhone 15 Pro Max</strong> to restore your 30% profit rate!
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Second Purchase with Balance Warning */}
          {tutorialStep === 5 && screen === 'luxury' && (
            <div className="fixed inset-0 flex items-center justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-2xl p-6 max-w-sm w-full border border-primary shadow-2xl">
                <div className="text-4xl mb-3 text-center">💡</div>
                <h3 className="text-xl font-bold mb-3 text-center">Ready for Another Purchase?</h3>
                <div className="bg-destructive/20 border-2 border-destructive rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-destructive mb-2">⚠️ IMPORTANT RULE:</p>
                  <p className="text-sm text-foreground">
                    Always keep at least <strong className="text-destructive">{currency}{Math.round(11000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}</strong> in your balance!
                    Never go below {currency}{Math.round(11000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'} or you risk losing the game!
                  </p>
                </div>
                {balance >= (Math.floor(items[1].price * 1.25) + 11000000) ? (
                  <>
                    <div className="text-sm bg-muted rounded-lg p-3 mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Your balance:</span>
                        <span className="font-semibold">{fmt(balance)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>MacBook cost:</span>
                        <span className="font-semibold">{fmt(Math.floor(items[1].price * 1.25))}</span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-1">
                        <span>Balance after:</span>
                        <span className="font-semibold text-primary">{fmt(balance - Math.floor(items[1].price * 1.25))} ✅</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setTutorialStep(6)}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                    >
                      Got it! Continue
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-sm bg-destructive/20 rounded-lg p-3 mb-4 text-destructive">
                      ❌ Not enough balance! This would drop you below {currency}{Math.round(11000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}. Skip this for now.
                    </div>
                    <button
                      onClick={() => { setTutorialSecondPurchase(true); setTutorialStep(7); setScreen('home'); }}
                      className="w-full bg-muted text-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                    >
                      Skip & Continue
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Account Manager Feature */}
          {tutorialStep === 7 && screen === 'home' && (
            <div className="fixed bottom-32 left-0 right-0 flex justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-xl p-6 border border-chart-2 shadow-2xl max-w-sm">
                <div className="text-3xl mb-2 text-center">💡</div>
                <h4 className="font-bold mb-2 text-center">Pro Tip: Account Manager</h4>
                <p className="text-sm text-center text-muted-foreground mb-3">
                  Use the <strong className="text-primary">Account Manager</strong> (shield icon) to pause all timers when you need a break!
                </p>
                <div className="text-xs bg-muted rounded-lg p-2 mb-3 text-center">
                  Cost: {currency}{Math.round(20000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'} • Pauses taxes & decay
                </div>
                <button
                  onClick={() => setTutorialStep(8)}
                  className="w-full bg-chart-2 text-white py-2 rounded-xl font-semibold hover-elevate active-elevate-2"
                >
                  Got it!
                </button>
              </div>
            </div>
          )}

          {/* Step 8: Tutorial Complete */}
          {tutorialStep === 8 && (
            <div className="fixed inset-0 flex items-center justify-center p-6" style={{ zIndex: 95 }}>
              <div className="bg-card rounded-2xl p-8 max-w-sm w-full border border-primary shadow-2xl">
                <div className="text-6xl mb-4 text-center">🎉</div>
                <h2 className="text-2xl font-bold mb-3 text-center">Tutorial Complete!</h2>
                <p className="text-center text-muted-foreground mb-6">
                  You're ready to get rich! Here's what you learned:
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Invest regularly for 30% returns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Buy items to restore profit rate</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Always keep {currency}{Math.round(11000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'}+ in balance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Use Account Manager when needed</span>
                  </div>
                </div>
                <button
                  onClick={completeTutorial}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                  data-testid="button-complete-tutorial"
                >
                  Start Playing! 💰
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
