import { useState, useEffect, useRef } from 'react';
import { Home, TrendingUp, ShoppingBag, User, ArrowLeft, Clock, AlertCircle, PieChart, Shield, ShieldOff, Zap, RotateCcw, Play } from 'lucide-react';
import iphoneImg from '@assets/Iphone_15_Pro_Max_1760488588844.png';
import macbookImg from '@assets/MacBook_Pro_M3_1760488589069.png';
import visionProImg from '@assets/Apple_Vision_Pro_1760488588518.png';
import watchImg from '@assets/Luxury_Watch_1760488588988.png';
import mercedesImg from '@assets/Mercedes G-Wagon_1761982502720.mp4';
import lamborghiniImg from '@assets/Lamborghini Urus_1761982502820.mp4';
import rollsRoyceImg from '@assets/Rolls Royce_1761982502890.mp4';
import bugattiImg from '@assets/Bugatti Chiron_1761982502946.mp4';
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
import music1 from '@assets/whip-afro-dancehall-music-110235_1761254522364.mp3';
import music2 from '@assets/exciting-no-copyright-music-334839_1761254644856.mp3';
import music3 from '@assets/fun-exciting-travel-background-music-350761_1761254717151.mp3';

// Background music system
let bgMusic: HTMLAudioElement | null = null;
let musicPlaylist: string[] = [];
let currentTrackIndex = 0;
let currentTrackPlayCount = 0;

// Sound effect utilities - create new instance each time for concurrent plays
const playKaChing = () => {
  const audio = new Audio(kaChingSound);
  audio.volume = 0.5;
  audio.play().catch(err => console.log('Ka-ching sound failed:', err));
};

// Shuffle array function
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const stopBackgroundMusic = () => {
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.removeEventListener('ended', handleTrackEnded);
    bgMusic = null;
  }
};

const handleTrackEnded = () => {
  currentTrackPlayCount++;
  
  if (currentTrackPlayCount >= 2) {
    // Played twice, move to next track
    currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
    currentTrackPlayCount = 0;
    
    // Clean up old audio
    if (bgMusic) {
      bgMusic.removeEventListener('ended', handleTrackEnded);
    }
    
    // Create new audio for next track
    const trackUrl = musicPlaylist[currentTrackIndex];
    bgMusic = new Audio(trackUrl);
    bgMusic.volume = 0.3;
    bgMusic.loop = false;
    bgMusic.addEventListener('ended', handleTrackEnded);
    
    bgMusic.play().catch(err => console.log('Next track play failed:', err));
  } else {
    // Play same track again
    if (bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.play().catch(err => console.log('Loop play failed:', err));
    }
  }
};

const startBackgroundMusic = () => {
  if (!bgMusic) {
    // Create shuffled playlist
    musicPlaylist = shuffleArray([music1, music2, music3]);
    currentTrackIndex = 0;
    currentTrackPlayCount = 0;
    
    const trackUrl = musicPlaylist[currentTrackIndex];
    bgMusic = new Audio(trackUrl);
    bgMusic.volume = 0.3;
    bgMusic.loop = false;
    
    // Listen for when the track ends
    bgMusic.addEventListener('ended', handleTrackEnded);
    
    // Try to play with user interaction context
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Background music started successfully');
        })
        .catch(err => {
          console.log('Background music play failed (autoplay policy):', err);
          // Store flag to retry on user interaction
          document.addEventListener('click', () => {
            if (bgMusic && bgMusic.paused) {
              bgMusic.play().catch(e => console.log('Retry failed:', e));
            }
          }, { once: true });
        });
    }
  }
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

  const [screen, setScreen] = useState('store');
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
  const [adTimer, setAdTimer] = useState(60);
  const [showGuide, setShowGuide] = useState(false);
  
  // Tutorial state
  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState<'click-invest' | 'make-investment' | 'wait-investment' | 'click-store' | 'buy-iphone' | 'click-invest-again' | 'click-home-after-completion' | 'view-expenses-info' | 'view-countdown' | 'show-final-message' | 'completed'>('click-invest');
  const [tutorialInvestmentId, setTutorialInvestmentId] = useState<number | null>(null);
  const [showTutorialComplete, setShowTutorialComplete] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  
  // Refs for stable values in intervals
  const tutorialActiveRef = useRef(tutorialActive);
  const tutorialStepRef = useRef(tutorialStep);
  const tutorialInvestmentIdRef = useRef(tutorialInvestmentId);
  
  // Update refs when state changes
  useEffect(() => {
    tutorialActiveRef.current = tutorialActive;
    tutorialStepRef.current = tutorialStep;
    tutorialInvestmentIdRef.current = tutorialInvestmentId;
  }, [tutorialActive, tutorialStep, tutorialInvestmentId]);
  
  // Expenses notification state
  const [showExpensesNotification, setShowExpensesNotification] = useState(false);
  const [expensesExpanded, setExpensesExpanded] = useState(false);
  const [expensesAutoHideTimer, setExpensesAutoHideTimer] = useState(0);
  const [lastExpensesDeducted, setLastExpensesDeducted] = useState({
    livingExpenses: 0,
    maintenance: 0,
    total: 0,
  });

  // Game over details
  const [gameOverDetails, setGameOverDetails] = useState({
    livingExpenses: 0,
    maintenanceCost: 0,
    balanceBeforeDeduction: 0,
    balanceAfterDeduction: 0,
  });

  const STORAGE_KEY = 'naijaWealthSim_gameState';
  const PLAYER_DATA_KEY = 'naijaWealthSim_playerData';

  const saveGameState = () => {
    const gameState = {
      balance,
      investments,
      owned,
      purchased,
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
        setReturnRate(0.30); // Always reset to 30% (profit rate reduction removed)
        setAccountManager(gameState.accountManager ?? false);
        setManagerCost(gameState.managerCost ?? 20000000);
        setTutorialActive(false); // Tutorial already done for returning players
      } else {
        // New player - start tutorial with clean state
        setTutorialActive(true);
        setTutorialStep('click-invest');
        setPurchased([]);
        setOwned([]);
        setBalance(50000000);
        localStorage.removeItem(STORAGE_KEY); // Clear any partial/invalid data
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  };

  const items = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 7500000, cat: 'Gadgets', img: iphoneImg, m: 1500000 },
    { id: 2, name: 'MacBook Pro M3', price: 14400000, cat: 'Gadgets', img: macbookImg, m: 2880000 },
    { id: 3, name: 'Apple Vision Pro', price: 19500000, cat: 'Gadgets', img: visionProImg, m: 3900000 },
    { id: 4, name: 'Luxury Watch', price: 75000000, cat: 'Gadgets', img: watchImg, m: 15000000 },
    { id: 6, name: 'Mercedes G-Wagon', price: 360000000, cat: 'Cars', img: mercedesImg, m: 72000000 },
    { id: 7, name: 'Lamborghini Urus', price: 750000000, cat: 'Cars', img: lamborghiniImg, m: 150000000 },
    { id: 8, name: 'Rolls Royce', price: 1350000000, cat: 'Cars', img: rollsRoyceImg, m: 270000000 },
    { id: 9, name: 'Bugatti Chiron', price: 2550000000, cat: 'Cars', img: bugattiImg, m: 510000000 },
    { id: 10, name: 'Ikoyi Duplex', price: 1140000000, cat: 'Houses', img: duplexImg, m: 228000000 },
    { id: 11, name: 'Lekki Penthouse', price: 1950000000, cat: 'Houses', img: penthouseImg, m: 390000000 },
    { id: 12, name: 'Banana Island Villa', price: 3600000000, cat: 'Houses', img: villaImg, m: 720000000 },
    { id: 13, name: 'Private Island', price: 10500000000, cat: 'Houses', img: privateIslandImg, m: 2100000000 },
    { id: 14, name: 'Cessna Citation', price: 5400000000, cat: 'Jets', img: cessnaCitationImg, m: 1080000000 },
    { id: 15, name: 'Bombardier Global', price: 9600000000, cat: 'Jets', img: bombardierImg, m: 1920000000 },
    { id: 16, name: 'Gulfstream G650', price: 16500000000, cat: 'Jets', img: gulfstreamImg, m: 3300000000 },
    { id: 17, name: 'Boeing Jet', price: 36000000000, cat: 'Jets', img: boeingJetImg, m: 7200000000 },
    { id: 18, name: 'Sport Yacht', price: 7500000000, cat: 'Yachts', img: sportYachtImg, m: 1500000000 },
    { id: 19, name: 'Luxury Yacht', price: 14400000000, cat: 'Yachts', img: luxuryYachtImg, m: 2880000000 },
    { id: 20, name: 'Mega Yacht', price: 28500000000, cat: 'Yachts', img: megaYachtImg, m: 5700000000 },
    { id: 21, name: 'Superyacht', price: 54000000000, cat: 'Yachts', img: superyachtImg, m: 10800000000 },
  ];

  const categories = ['All', 'Gadgets', 'Cars', 'Houses', 'Jets', 'Yachts'];

  useEffect(() => {
    loadGameState();
    
    // Load player data
    const savedPlayerData = localStorage.getItem(PLAYER_DATA_KEY);
    if (savedPlayerData) {
      try {
        const data = JSON.parse(savedPlayerData);
        setPlayerName(data.playerName || '');
        setPlayerCountry(data.playerCountry || 'Nigeria');
        setCurrency(data.currency || '₦');
        setConversionRate(data.conversionRate || 1);
        
        // Start background music after player data is loaded (user has signed up)
        startBackgroundMusic();
      } catch (error) {
        console.error('Failed to load player data:', error);
      }
    }
  }, []);

  useEffect(() => {
    saveGameState();
  }, [balance, investments, owned, purchased, accountManager, managerCost]);

  useEffect(() => {
    setMaintenance(owned.reduce((s, i) => s + i.m, 0));
  }, [owned]);

  useEffect(() => {
    if (gameOver || accountManager) return;
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
  }, [gameOver, accountManager]);

  useEffect(() => {
    // Pause timers during tutorial, start them when countdown glows
    if (gameOver || accountManager || (tutorialActive && tutorialStep !== 'view-countdown' && tutorialStep !== 'show-final-message' && tutorialStep !== 'completed')) return;
    const t = setInterval(() => {
      setTaxTimer(p => {
        if (p <= 1) {
          const tax = Math.floor(balance * taxRate);
          const total = tax + maintenance;
          const actualBalanceAfter = balance - total; // Actual balance after deduction (could be negative or below 5M)
          const newBal = Math.max(5000000, actualBalanceAfter);
          setBalance(newBal);
          
          if (newBal <= 5000000) {
            // Capture game over details with actual balance after deduction
            setGameOverDetails({
              livingExpenses: tax,
              maintenanceCost: maintenance,
              balanceBeforeDeduction: balance,
              balanceAfterDeduction: actualBalanceAfter, // Show actual balance, not clamped value
            });
            stopBackgroundMusic(); // Stop music when game over
            setGameOver(true);
          }
          
          // Capture actual deducted amounts for expenses notification
          setLastExpensesDeducted({
            livingExpenses: tax,
            maintenance: maintenance,
            total: total,
          });
          
          // Show expenses notification immediately when expenses are deducted
          setShowExpensesNotification(true);
          setExpensesExpanded(false);
          setExpensesAutoHideTimer(0);
          
          return 30;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [balance, gameOver, taxRate, maintenance, accountManager, tutorialActive, showTutorialComplete]);

  useEffect(() => {
    if (accountManager) return;
    const t = setInterval(() => {
      setInvestments(p => {
        const updatedInvestments = p.map(inv => {
          if (inv.t <= 1) {
            // Credit balance with principal + profit
            setBalance(b => b + Math.floor(inv.a * (1 + inv.r)));
            playKaChing(); // Ka-ching sound when investment returns!
            
            // Tutorial: Check if first investment completed using refs for stable values
            if (tutorialActiveRef.current && tutorialStepRef.current === 'wait-investment' && inv.id === tutorialInvestmentIdRef.current) {
              setTimeout(() => setTutorialStep('click-store'), 100);
            }
            
            return null;
          }
          return { ...inv, t: inv.t - 1 };
        }).filter(Boolean) as Array<{id: number, a: number, t: number, r: number}>;
        
        return updatedInvestments;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [accountManager]);

  // Auto-hide tutorial completion popup after 5s
  useEffect(() => {
    if (showTutorialComplete) {
      const timer = setTimeout(() => {
        setShowTutorialComplete(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTutorialComplete]);

  // Tutorial: Handle expenses info and countdown glowing sequence
  useEffect(() => {
    if (tutorialActive && tutorialStep === 'view-expenses-info') {
      // Glow living expenses info for 3s
      const timer = setTimeout(() => {
        setTutorialStep('view-countdown');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [tutorialActive, tutorialStep]);

  // Tutorial: Show final message and complete tutorial
  useEffect(() => {
    if (tutorialActive && tutorialStep === 'view-countdown') {
      // Show final message after a brief moment
      const timer = setTimeout(() => {
        setShowFinalMessage(true);
        setTutorialStep('show-final-message');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [tutorialActive, tutorialStep]);

  // Auto-hide final message after 5s and complete tutorial
  useEffect(() => {
    if (showFinalMessage) {
      const timer = setTimeout(() => {
        setShowFinalMessage(false);
        setTutorialActive(false);
        setTutorialStep('completed');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showFinalMessage]);

  // Auto-hide notification after 10s if not dismissed
  useEffect(() => {
    if (!showExpensesNotification || expensesExpanded) return;
    
    const timer = setInterval(() => {
      setExpensesAutoHideTimer(prev => {
        if (prev >= 10) {
          setShowExpensesNotification(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showExpensesNotification, expensesExpanded]);

  const fmt = (n: number) => {
    const convertedAmount = Math.round(n * conversionRate);
    return `${currency}${new Intl.NumberFormat('en-US').format(convertedAmount)}`;
  };
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const invest = (amt: number) => {
    const a = parseInt(amt.toString());
    
    // Basic validation: minimum investment 1M and must keep game-over threshold (5M)
    if (a < 1000000 || (balance - a) < 5000000) return;
    
    setBalance(balance - a);
    const investmentId = Date.now();
    setInvestments([...investments, { id: investmentId, a, t: 60, r: returnRate }]);
    playDeposit(); // Sound effect for making an investment
    
    // Tutorial: Track first investment
    if (tutorialActive && tutorialStep === 'make-investment' && a === 40000000) {
      setTutorialInvestmentId(investmentId);
      setTutorialStep('wait-investment');
    }
    
    // Tutorial: Second investment shows completion popup
    if (tutorialActive && tutorialStep === 'click-invest-again') {
      setShowTutorialComplete(true);
      setTutorialStep('click-home-after-completion');
    }
  };

  const buy = (item: any) => {
    const cost = Math.floor(item.price * 1.25);
    if (cost > balance || (balance - cost) < 5000000) return;
    setBalance(balance - cost);
    setOwned([...owned, { ...item, price: item.price, m: item.m }]);
    setPurchased([...purchased, item.id]);
    
    // Tutorial: Check if bought iPhone
    if (tutorialActive && tutorialStep === 'buy-iphone' && item.id === 1) {
      setTutorialStep('click-invest-again');
      setScreen('home'); // Navigate back to home
    }
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

  const handleTryAgain = () => {
    // Clear localStorage for completely fresh start
    localStorage.removeItem(STORAGE_KEY);
    
    // Reset everything - fresh start with ₦50M
    setBalance(50000000);
    setInvestments([]);
    setOwned([]);
    setPurchased([]);
    setMaintenance(0);
    setAccountManager(false);
    setManagerCost(20000000);
    setGameOver(false);
    
    // Restart tutorial for new game
    setTutorialActive(true);
    setTutorialStep('click-invest');
    setShowTutorialComplete(false);
    setShowFinalMessage(false);
    
    // Reset to default Store page
    setScreen('store');
    
    // Restart background music
    startBackgroundMusic();
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
                <div className={`flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2 ${tutorialActive && tutorialStep === 'view-countdown' ? 'tutorial-highlight' : ''}`}>
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

            <div className={`bg-chart-5/10 border border-chart-5/20 rounded-xl p-4 ${tutorialActive && tutorialStep === 'view-expenses-info' ? 'tutorial-highlight' : ''}`} data-testid="card-living-expenses-info">
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

            {showExpensesNotification && (
              <div className={`bg-chart-5/10 rounded-xl p-4 border-2 ${expensesExpanded ? 'border-chart-5/20' : 'border-destructive animate-pulse'}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">🔔</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      {fmt(lastExpensesDeducted.total)} was debited!
                    </div>
                  </div>
                </div>
                
                {!expensesExpanded ? (
                  <button
                    onClick={() => setExpensesExpanded(true)}
                    className="w-full bg-chart-5/20 text-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover-elevate active-elevate-2"
                    data-testid="button-see-why"
                  >
                    See Why
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-foreground mb-2">▼ Breakdown:</div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🍽️</span> Food & Dining
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.16))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>👔</span> Clothing & Fashion
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.08))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🎬</span> Entertainment
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>✈️</span> Travel
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🚗</span> Transportation
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.20))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>👨‍👩‍👧</span> Family Support
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.20))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🚨</span> Emergency Fund
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 mt-1.5 border-t border-chart-5/30">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🔧</span> Maintenance
                        </span>
                        <span className="font-semibold">{fmt(lastExpensesDeducted.maintenance)}</span>
                      </div>
                    </div>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 mt-3">
                      <div className="text-xs text-foreground">
                        <span className="font-semibold">⚠️ Keep enough balance to cover expenses.</span>
                        <div className="mt-1">
                          It's game over if your balance goes below {fmt(5000000)}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mt-2">
                      Next deduction in {taxTimer}s ⏱️
                    </div>

                    <button
                      onClick={() => {
                        setShowExpensesNotification(false);
                        setExpensesExpanded(false);
                      }}
                      className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium hover-elevate active-elevate-2 mt-3"
                      data-testid="button-got-it"
                    >
                      Got It
                    </button>
                  </div>
                )}
              </div>
            )}

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
          <div className="p-6 space-y-4 relative">
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
            
            {/* Expenses Notification on Invest Page */}
            {showExpensesNotification && (
              <div className={`bg-chart-5/10 rounded-xl p-4 border-2 ${expensesExpanded ? 'border-chart-5/20' : 'border-destructive animate-pulse'}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">🔔</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      {fmt(lastExpensesDeducted.total)} was debited!
                    </div>
                  </div>
                </div>
                
                {!expensesExpanded ? (
                  <button
                    onClick={() => setExpensesExpanded(true)}
                    className="w-full bg-chart-5/20 text-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover-elevate active-elevate-2"
                    data-testid="button-see-why"
                  >
                    See Why
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-foreground mb-2">▼ Breakdown:</div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🍽️</span> Food & Dining
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.16))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>👔</span> Clothing & Fashion
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.08))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🎬</span> Entertainment
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>✈️</span> Travel
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🚗</span> Transportation
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.20))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>👨‍👩‍👧</span> Family Support
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.20))}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🚨</span> Emergency Fund
                        </span>
                        <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 mt-1.5 border-t border-chart-5/30">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <span>🔧</span> Maintenance
                        </span>
                        <span className="font-semibold">{fmt(lastExpensesDeducted.maintenance)}</span>
                      </div>
                    </div>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 mt-3">
                      <div className="text-xs text-foreground">
                        <span className="font-semibold">⚠️ Keep enough balance to cover expenses.</span>
                        <div className="mt-1">
                          It's game over if your balance goes below {fmt(5000000)}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mt-2">
                      Next deduction in {taxTimer}s ⏱️
                    </div>

                    <button
                      onClick={() => {
                        setShowExpensesNotification(false);
                        setExpensesExpanded(false);
                      }}
                      className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium hover-elevate active-elevate-2 mt-3"
                      data-testid="button-got-it"
                    >
                      Got It
                    </button>
                  </div>
                )}
              </div>
            )}
            
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

            <div className="grid grid-cols-2 gap-3">
              {[1000000, 10000000, 40000000, 100000000].map(a => {
                // Format the button label for smaller amounts
                const label = `${currency}${Math.round(a * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}${conversionRate === 1 ? 'M' : 'K'}`;
                const shouldHighlight = tutorialActive && tutorialStep === 'make-investment' && a === 40000000;
                
                return (
                  <button 
                    key={a} 
                    onClick={() => invest(a)} 
                    disabled={a > balance || (balance - a) < 5000000 || (tutorialActive && tutorialStep === 'make-investment' && a !== 40000000)} 
                    className={`py-6 font-semibold bg-card border-2 border-card-border rounded-xl disabled:opacity-50 hover-elevate active-elevate-2 ${shouldHighlight ? 'tutorial-highlight' : ''}`}
                    data-testid={`button-invest-${a}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* 1 Billion Button - Full Width */}
            <button 
              onClick={() => invest(1000000000)} 
              disabled={1000000000 > balance || (balance - 1000000000) < 5000000} 
              className="w-full py-6 font-semibold bg-card border-2 border-card-border rounded-xl disabled:opacity-50 hover-elevate active-elevate-2"
              data-testid="button-invest-1000000000"
            >
              {fmt(1000000000 * conversionRate)}
            </button>

            {/* Investment History */}
            {investments.map(inv => {
              const shouldHighlight = tutorialActive && tutorialStep === 'wait-investment' && inv.id === tutorialInvestmentId;
              
              return (
                <div key={inv.id} className={`bg-card rounded-xl p-4 border border-card-border ${shouldHighlight ? 'tutorial-highlight' : ''}`} data-testid={`investment-${inv.id}`}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Investment</div>
                      <div className="font-semibold">{fmt(inv.a)}</div>
                    </div>
                    <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">+{(inv.r * 100).toFixed(0)}%</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{accountManager ? 'Paused' : `${inv.t}s`}</div>
                  
                  {/* Tutorial message */}
                  {shouldHighlight && (
                    <div className="mt-3 bg-primary/20 rounded-lg p-3 text-xs text-primary font-medium">
                      ⏳ Wait for your investment return
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {screen === 'store' && (
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
              {items.filter(i => {
                // Tutorial override: force-show only iPhone during buy-iphone step
                if (tutorialActive && tutorialStep === 'buy-iphone') {
                  return i.id === 1;
                }
                // Normal filtering
                return !purchased.includes(i.id) && (selectedCategory === 'All' || i.cat === selectedCategory);
              }).map(i => {
                const totalCost = Math.floor(i.price * 1.25);
                const shouldHighlight = tutorialActive && tutorialStep === 'buy-iphone' && i.id === 1;
                
                return (
                  <div key={i.id} className={`bg-card rounded-xl overflow-hidden border border-card-border ${shouldHighlight ? 'tutorial-highlight' : ''}`} data-testid={`item-${i.id}`}>
                    {i.cat === 'Cars' ? (
                      <video 
                        src={i.img} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-64 object-cover shadow-lg"
                      />
                    ) : (
                      <img 
                        src={i.img} 
                        alt={i.name}
                        className="w-full h-64 object-cover shadow-lg"
                      />
                    )}
                    <div className="p-4 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{i.name}</div>
                        <div className="font-bold text-lg mb-1">{fmt(totalCost)}</div>
                        <div className="text-xs text-chart-5">-{fmt(i.m)}/30s</div>
                      </div>
                      <button 
                        onClick={() => buy(i)} 
                        disabled={balance < totalCost || (tutorialActive && tutorialStep === 'buy-iphone' && i.id !== 1)} 
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
              {showExpensesNotification && (
                <div className={`bg-chart-5/10 rounded-xl p-4 border-2 ${expensesExpanded ? 'border-chart-5/20' : 'border-destructive animate-pulse'}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">🔔</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">
                        {fmt(lastExpensesDeducted.total)} was debited!
                      </div>
                    </div>
                  </div>
                  
                  {!expensesExpanded ? (
                    <button
                      onClick={() => setExpensesExpanded(true)}
                      className="w-full bg-chart-5/20 text-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover-elevate active-elevate-2"
                      data-testid="button-see-why"
                    >
                      See Why
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-foreground mb-2">▼ Breakdown:</div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>🍽️</span> Food & Dining
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.16))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>👔</span> Clothing & Fashion
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.08))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>🎬</span> Entertainment
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>✈️</span> Travel
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>🚗</span> Transportation
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.20))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>👨‍👩‍👧</span> Family Support
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.20))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>🚨</span> Emergency Fund
                          </span>
                          <span className="font-semibold">{fmt(Math.floor(lastExpensesDeducted.livingExpenses * 0.12))}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5 mt-1.5 border-t border-chart-5/30">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <span>🔧</span> Maintenance
                          </span>
                          <span className="font-semibold">{fmt(lastExpensesDeducted.maintenance)}</span>
                        </div>
                      </div>

                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 mt-3">
                        <div className="text-xs text-foreground">
                          <span className="font-semibold">⚠️ Keep enough balance to cover expenses.</span>
                          <div className="mt-1">
                            It's game over if your balance goes below {fmt(5000000)}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-2">
                        Next deduction in {taxTimer}s ⏱️
                      </div>

                      <button
                        onClick={() => {
                          setShowExpensesNotification(false);
                          setExpensesExpanded(false);
                        }}
                        className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium hover-elevate active-elevate-2 mt-3"
                        data-testid="button-got-it"
                      >
                        Got It
                      </button>
                    </div>
                  )}
                </div>
              )}
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
                    {i.cat === 'Cars' ? (
                      <video 
                        src={i.img} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <img 
                        src={i.img} 
                        alt={i.name}
                        className="w-full h-32 object-cover"
                      />
                    )}
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
            { id: 'store', icon: ShoppingBag, label: 'Store' },
            { id: 'portfolio', icon: PieChart, label: 'Portfolio' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(({ id, icon: Icon, label }) => {
            const shouldHighlight = tutorialActive && (
              (tutorialStep === 'click-invest' && id === 'invest') ||
              (tutorialStep === 'click-store' && id === 'store') ||
              (tutorialStep === 'click-invest-again' && id === 'invest') ||
              (tutorialStep === 'click-home-after-completion' && id === 'home')
            );
            
            // Disable all buttons during wait-investment, and non-store buttons during buy-iphone
            const isDisabled = tutorialActive && (
              (tutorialStep === 'wait-investment') ||
              (tutorialStep === 'buy-iphone' && id !== 'store')
            );
            
            return (
              <button 
                key={id} 
                onClick={() => {
                  if (isDisabled) return; // Prevent navigation during tutorial waiting phases
                  
                  if (tutorialActive && tutorialStep === 'click-invest' && id === 'invest') {
                    setScreen(id);
                    setTutorialStep('make-investment');
                  } else if (tutorialActive && tutorialStep === 'click-store' && id === 'store') {
                    setScreen(id);
                    setTutorialStep('buy-iphone');
                  } else if (tutorialActive && tutorialStep === 'click-invest-again' && id === 'invest') {
                    setScreen(id);
                  } else if (tutorialActive && tutorialStep === 'click-home-after-completion' && id === 'home') {
                    setScreen(id);
                    setTutorialStep('view-expenses-info');
                  } else if (!tutorialActive) {
                    setScreen(id);
                  }
                }}
                className={`flex flex-col items-center gap-1 transition-colors rounded-lg ${
                  screen === id ? 'text-primary' : 'text-muted-foreground'
                } ${shouldHighlight ? 'tutorial-highlight' : ''} ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                data-testid={`nav-${id}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tutorial Completion Popup */}
      {showTutorialComplete && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 mx-4 max-w-sm shadow-2xl border-2 border-primary/50">
            <div className="text-white text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-lg font-bold">Great job!</h3>
              <p className="text-sm opacity-90 mt-1">Now you know the basics</p>
            </div>
          </div>
        </div>
      )}

      {/* Final Tutorial Message */}
      {showFinalMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-gradient-to-br from-chart-1 to-chart-1/80 rounded-2xl p-6 mx-4 max-w-sm shadow-2xl border-2 border-chart-1/50">
            <div className="text-white text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-lg font-bold">Buy all the items to win the game!</h3>
              <p className="text-sm opacity-90 mt-1">Good luck!</p>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6" style={{ zIndex: 60 }}>
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full border-2 border-destructive">
            <div className="text-6xl mb-4 text-center">💸</div>
            <h2 className="text-2xl font-bold mb-2 text-center text-destructive">Game Over!</h2>
            
            {/* Expense Breakdown */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Balance before:</span>
                <span className="font-semibold text-foreground">{fmt(gameOverDetails.balanceBeforeDeduction)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Living expenses:</span>
                <span className="font-semibold text-destructive">-{fmt(gameOverDetails.livingExpenses)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Maintenance cost:</span>
                <span className="font-semibold text-destructive">-{fmt(gameOverDetails.maintenanceCost)}</span>
              </div>
              <div className="border-t border-destructive/30 pt-2 mt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Balance after:</span>
                  <span className="font-bold text-destructive">{fmt(gameOverDetails.balanceAfterDeduction)}</span>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-foreground text-center">
                ⚠️ Your balance went below {fmt(5000000)}! Keep enough balance to sustain your living expenses and maintenance costs next time.
              </p>
            </div>

            {/* Continue Info */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground text-center font-semibold">Starting fresh:</p>
              <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                <li>🔄 Reset to {fmt(50000000)}</li>
                <li>❌ Lose all items & investments</li>
                <li>🎯 Try to win this time!</li>
              </ul>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleTryAgain}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-xl font-bold text-lg hover-elevate active-elevate-2"
              data-testid="button-try-again"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
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
                <p className="text-muted-foreground mb-2">Your profit rate is <strong>30%</strong> for all investments!</p>
                <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 mt-2">
                  <p className="text-primary text-xs font-semibold">💡 Tip:</p>
                  <p className="text-primary text-xs">Keep investing to grow your balance and buy all 20 items to win!</p>
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
                <p className="text-muted-foreground">• <strong>Invest smart:</strong> Always get 30% returns in 60 seconds!</p>
                <p className="text-muted-foreground">• <strong>Start small:</strong> Buy cheaper items first to build your collection</p>
                <p className="text-muted-foreground">• <strong>Use Account Manager:</strong> Pause timers when needed ({currency}{Math.round(20000000 * conversionRate / (conversionRate === 1 ? 1000000 : 1000))}{conversionRate === 1 ? 'M' : 'K'})</p>
                <p className="text-muted-foreground">• <strong>Watch your balance:</strong> Living expenses take 25% every 30s</p>
                <p className="text-muted-foreground">• <strong>Keep investing:</strong> Regular investments help maintain your balance!</p>
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

    </div>
  );
}
