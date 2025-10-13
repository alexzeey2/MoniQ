import { useState, useEffect } from 'react';
import { Home, TrendingUp, ShoppingBag, User, ArrowLeft, Clock, AlertCircle, PieChart, Shield, ShieldOff, Zap, RotateCcw, Play } from 'lucide-react';
import iphoneImg from '@assets/stock_images/iphone_15_pro_max_sm_1174984a.jpg';
import macbookImg from '@assets/stock_images/macbook_pro_m3_lapto_72f862fb.jpg';
import visionProImg from '@assets/stock_images/apple_vision_pro_hea_d2befd55.jpg';
import watchImg from '@assets/stock_images/luxury_watch_product_3f9680fe.jpg';
import homeTheaterImg from '@assets/stock_images/home_theater_system__1e505e7e.jpg';
import mercedesImg from '@assets/stock_images/mercedes_g-wagon_g-c_b8ac926c.jpg';
import lamborghiniImg from '@assets/stock_images/lamborghini_urus_sup_4b4a42cb.jpg';
import rollsRoyceImg from '@assets/stock_images/rolls_royce_luxury_c_f98068e8.jpg';
import bugattiImg from '@assets/stock_images/bugatti_chiron_hyper_a2ee3f4b.jpg';
import duplexImg from '@assets/stock_images/luxury_duplex_house__74c0a9a7.jpg';
import penthouseImg from '@assets/stock_images/luxury_penthouse_apa_bccf7330.jpg';
import villaImg from '@assets/stock_images/luxury_villa_mansion_11e43a80.jpg';
import privateIslandImg from '@assets/stock_images/private_island_tropi_57eabe22.jpg';
import cessnaCitationImg from '@assets/stock_images/cessna_citation_priv_91d55f94.jpg';
import bombardierImg from '@assets/stock_images/bombardier_global_bu_405a472c.jpg';
import gulfstreamImg from '@assets/stock_images/gulfstream_g650_priv_1484f1cf.jpg';
import boeingJetImg from '@assets/stock_images/boeing_private_jet_p_ae8bd119.jpg';
import sportYachtImg from '@assets/stock_images/sport_yacht_boat_pro_a1fc26e2.jpg';
import luxuryYachtImg from '@assets/stock_images/luxury_yacht_boat_pr_782653a0.jpg';
import megaYachtImg from '@assets/stock_images/mega_yacht_superyach_38d15143.jpg';
import superyachtImg from '@assets/stock_images/superyacht_large_yac_19d2e1a3.jpg';

export default function NaijaWealthSim() {
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
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAdSimulation, setShowAdSimulation] = useState(false);
  const [adCountdown, setAdCountdown] = useState(30);

  const STORAGE_KEY = 'naijaWealthSim_gameState';

  const saveGameState = () => {
    const gameState = {
      balance,
      investments,
      owned,
      purchased,
      level,
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
        setLevel(gameState.level ?? 1);
        setReturnRate(gameState.returnRate ?? 0.30);
        setAccountManager(gameState.accountManager ?? false);
        setManagerCost(gameState.managerCost ?? 20000000);
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  };

  const items = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 2500000, cat: 'Gadgets', img: iphoneImg, m: 50000 },
    { id: 2, name: 'MacBook Pro M3', price: 4800000, cat: 'Gadgets', img: macbookImg, m: 80000 },
    { id: 3, name: 'Apple Vision Pro', price: 6500000, cat: 'Gadgets', img: visionProImg, m: 120000 },
    { id: 4, name: 'Luxury Watch', price: 25000000, cat: 'Gadgets', img: watchImg, m: 300000 },
    { id: 5, name: 'Home Theater', price: 45000000, cat: 'Gadgets', img: homeTheaterImg, m: 500000 },
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
  }, []);

  useEffect(() => {
    saveGameState();
  }, [balance, investments, owned, purchased, level, returnRate, accountManager, managerCost]);

  useEffect(() => {
    setMaintenance(owned.reduce((s, i) => s + i.m, 0));
  }, [owned]);

  useEffect(() => {
    if (gameOver || accountManager) return;
    const t = setInterval(() => {
      setDecayTimer(p => {
        if (p <= 1) {
          setReturnRate(c => Math.max(0.00, c - 0.10));
          return 420;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [gameOver, accountManager]);

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
    if (gameOver || accountManager) return;
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
  }, [balance, gameOver, taxRate, maintenance, accountManager]);

  useEffect(() => {
    if (accountManager) return;
    const t = setInterval(() => {
      setInvestments(p => p.map(inv => {
        if (inv.t <= 1) {
          setBalance(b => b + Math.floor(inv.a * (1 + inv.r)));
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

  const getLevelBadge = (lvl: number) => {
    const badges = ['🥉', '🥈', '🥇', '💎', '👑', '⭐', '🔥', '💫', '🏆', '🎖️'];
    return badges[lvl - 1] || '🏅';
  };

  const getLevelMultiplier = () => {
    return {
      itemCostMultiplier: 1 + ((level - 1) * 0.30),
      maintenanceMultiplier: 1 + ((level - 1) * 0.30),
      startingBalance: 50000000 * (1 + ((level - 1) * 0.20)),
      baseReturnRate: 0.30 - ((level - 1) * 0.02)
    };
  };

  const checkLevelUp = () => {
    const totalItemsInGame = 21;
    if (owned.length === totalItemsInGame && level < 10) {
      setShowLevelUp(true);
    }
  };

  const startNextLevel = () => {
    const nextLevel = level + 1;
    
    setLevel(nextLevel);
    setBalance(Math.floor(50000000 * (1 + ((nextLevel - 1) * 0.20))));
    setReturnRate(0.30 - ((nextLevel - 1) * 0.02));
    setInvestments([]);
    setOwned([]);
    setPurchased([]);
    setTaxTimer(30);
    setDecayTimer(420);
    setMaintenance(0);
    setAccountManager(false);
    setManagerCost(20000000);
    setShowLevelUp(false);
  };

  useEffect(() => {
    checkLevelUp();
  }, [owned, level]);

  const fmt = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(n);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const invest = (amt: number) => {
    const a = parseInt(amt.toString());
    if (a > balance || a < 1000000 || (balance - a) < 5000000) return;
    setBalance(balance - a);
    setInvestments([...investments, { id: Date.now(), a, t: 60, r: returnRate }]);
  };

  const buy = (item: any) => {
    const multipliers = getLevelMultiplier();
    const adjustedPrice = Math.floor(item.price * multipliers.itemCostMultiplier);
    const cost = Math.floor(adjustedPrice * 1.25);
    if (cost > balance || (balance - cost) < 5000000) return;
    setBalance(balance - cost);
    const adjustedMaintenance = Math.floor(item.m * multipliers.maintenanceMultiplier);
    setOwned([...owned, { ...item, price: adjustedPrice, m: adjustedMaintenance }]);
    setPurchased([...purchased, item.id]);
    setReturnRate(getLevelMultiplier().baseReturnRate);
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
    localStorage.removeItem(STORAGE_KEY);
    setBalance(50000000);
    setInvestments([]);
    setOwned([]);
    setPurchased([]);
    setReturnRate(0.30);
    setDecayTimer(420);
    setGameOver(false);
    setAccountManager(false);
    setManagerCost(20000000);
    setLevel(1);
    setTaxTimer(30);
    setMaintenance(0);
    setAdTimer(60);
    setShowAd(false);
    setShowAdSimulation(false);
    setAdCountdown(30);
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
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm opacity-80 mb-1">Balance</div>
                  <div className="text-3xl font-bold" data-testid="text-balance">{fmt(balance)}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl">{getLevelBadge(level)}</div>
                  <div className="text-xs opacity-80 mt-1">Level {level}</div>
                </div>
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

            <button 
              onClick={() => setShowGuide(true)} 
              className="w-full bg-gradient-to-r from-chart-2 to-chart-3 text-white rounded-xl p-4 shadow flex items-center justify-between hover-elevate active-elevate-2"
              data-testid="button-show-guide"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2 text-2xl">📚</div>
                <div className="text-left">
                  <div className="font-bold">How to Play</div>
                  <div className="text-sm opacity-90">Learn basics & strategies</div>
                </div>
              </div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {!accountManager && (
              <div className={`rounded-xl p-4 border-2 ${returnRate < 0.20 ? 'bg-destructive/10 border-destructive/30' : returnRate < 0.25 ? 'bg-chart-5/10 border-chart-5/30' : 'bg-chart-2/10 border-chart-2/20'}`}>
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold">Investment Profit: {(returnRate * 100).toFixed(0)}%</span>
                      <span className="text-xs">Weakens in {formatTime(decayTimer)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div className={`h-2 rounded-full transition-all duration-300 ${decayTimer > 300 ? 'bg-primary' : decayTimer > 120 ? 'bg-chart-5' : 'bg-destructive'}`} style={{ width: `${(decayTimer / 420) * 100}%` }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {returnRate < 0.30 ? (
                        <span className="text-chart-5 font-medium">Profit decreased by {((0.30 - returnRate) * 100).toFixed(0)}%! Buy item to restore.</span>
                      ) : (
                        <span>Profit decreases -10% every 7 mins. Buy items to reset!</span>
                      )}
                    </div>
                    {returnRate <= 0.10 && (
                      <div className="mt-2 text-xs bg-destructive/20 border border-destructive/30 rounded px-2 py-1 text-destructive font-medium">
                        ⚠️ DANGER! At 0% profit you can't earn money and will lose!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

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

            {maintenance > 0 && (
              <div className="bg-chart-5/10 border border-chart-5/20 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-chart-5 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Item Maintenance</div>
                    <div className="text-xs text-muted-foreground">{fmt(maintenance)}/30s for {owned.length} items</div>
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
                    25% of balance deducted every 30s. Keep above ₦5M!
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setScreen('invest')} 
                className="bg-card rounded-xl p-4 shadow border border-card-border hover-elevate active-elevate-2"
                data-testid="button-nav-invest"
              >
                <div className="bg-chart-2/20 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-chart-2" />
                </div>
                <div className="font-semibold">Invest</div>
                <div className="text-xs text-chart-2 font-bold">{(returnRate * 100).toFixed(0)}%</div>
              </button>
              <button 
                onClick={() => setScreen('luxury')} 
                className="bg-card rounded-xl p-4 shadow border border-card-border hover-elevate active-elevate-2"
                data-testid="button-nav-store"
              >
                <div className="bg-chart-3/20 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
                  <ShoppingBag className="w-5 h-5 text-chart-3" />
                </div>
                <div className="font-semibold">Store</div>
                <div className="text-xs text-muted-foreground">Reset power</div>
              </button>
            </div>

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
            <div className="grid grid-cols-3 gap-3">
              {[1000000, 10000000, 100000000].map(a => (
                <button 
                  key={a} 
                  onClick={() => invest(a)} 
                  disabled={a > balance || (balance - a) < 5000000} 
                  className="py-6 font-semibold bg-card border-2 border-card-border rounded-xl disabled:opacity-50 hover-elevate active-elevate-2"
                  data-testid={`button-invest-${a}`}
                >
                  ₦{a / 1000000}M
                </button>
              ))}
            </div>
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
                const multipliers = getLevelMultiplier();
                const adjustedPrice = Math.floor(i.price * multipliers.itemCostMultiplier);
                const adjustedMaintenance = Math.floor(i.m * multipliers.maintenanceMultiplier);
                const totalCost = Math.floor(adjustedPrice * 1.25);
                
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
                        <div className="text-xs text-chart-5">-{fmt(adjustedMaintenance)}/30s</div>
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
              <div className="text-3xl font-bold mb-2">{fmt(balance + investments.reduce((s, i) => s + i.a, 0) + investments.reduce((s, i) => s + Math.floor(i.a * i.r), 0) - Math.floor(balance * taxRate) - maintenance)}</div>
              <div className="text-xs opacity-80">Returns: {(returnRate * 100).toFixed(0)}%</div>
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
              <div className="bg-chart-3/10 rounded-xl p-4 border border-chart-3/20">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Profit Rate</span>
                  <span className="font-semibold">{(returnRate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weakens In</span>
                  <span className="font-semibold">{formatTime(decayTimer)}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  -10% every 7 minutes
                </div>
              </div>
              <div className="bg-chart-5/10 rounded-xl p-4 border border-chart-5/20">
                <div className="text-sm font-semibold text-foreground mb-2">Next Expenses</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Living Expenses (25%)</span>
                    <span className="font-semibold">-{fmt(Math.floor(balance * taxRate))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="font-semibold">-{fmt(maintenance)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'profile' && (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
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
                  <div className="text-muted-foreground">Level</div>
                  <div className="font-bold text-lg">{getLevelBadge(level)} {level}</div>
                </div>
                <div className="bg-card/30 rounded-lg p-2">
                  <div className="text-muted-foreground">Profit Rate</div>
                  <div className="font-bold text-lg">{(getLevelMultiplier().baseReturnRate * 100).toFixed(0)}%</div>
                </div>
                <div className="bg-card/30 rounded-lg p-2">
                  <div className="text-muted-foreground">Items</div>
                  <div className="font-bold text-lg">{owned.length}/21</div>
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
          ].map(({ id, icon: Icon, label }) => (
            <button 
              key={id} 
              onClick={() => setScreen(id)} 
              className={`flex flex-col items-center gap-1 transition-colors ${screen === id ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid={`nav-${id}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Level Up Modal */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6" style={{ zIndex: 60 }}>
          <div className="bg-card rounded-2xl p-8 max-w-sm text-center border border-card-border">
            <div className="text-6xl mb-4">{getLevelBadge(level + 1)}</div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">Level {level} Complete!</h2>
            <p className="text-muted-foreground mb-4">You bought all {owned.length} items! Ready for the next challenge?</p>
            
            <div className="bg-gradient-to-br from-chart-3/20 to-chart-2/20 rounded-xl p-4 mb-6 text-left border border-chart-3/30">
              <div className="font-semibold text-foreground mb-3">Level {level + 1} Changes:</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Starting Balance:</span>
                  <span className="font-semibold text-primary">+20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Item Prices:</span>
                  <span className="font-semibold text-chart-5">+30%</span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance:</span>
                  <span className="font-semibold text-chart-5">+30%</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Profit:</span>
                  <span className="font-semibold text-destructive">-2%</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-chart-3">
                New max profit: {((getLevelMultiplier().baseReturnRate - 0.02) * 100).toFixed(0)}%
              </div>
            </div>

            {level >= 10 && (
              <div className="mb-6">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-bold text-xl text-primary">GAME MASTERED!</div>
                <p className="text-sm text-muted-foreground mt-2">You've conquered all 10 levels!</p>
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => setShowLevelUp(false)} 
                className="flex-1 bg-muted text-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2"
                data-testid="button-stay-level"
              >
                Stay Here
              </button>
              <button 
                onClick={startNextLevel}
                disabled={level >= 10}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 rounded-xl font-semibold hover-elevate active-elevate-2 disabled:opacity-50"
                data-testid="button-next-level"
              >
                {level >= 10 ? 'Max Level!' : 'Next Level'}
              </button>
            </div>
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
              Your balance dropped below ₦5M. Choose your next move:
            </p>

            {/* Consequence Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔄</div>
                <div className="font-semibold text-sm text-foreground mb-1">Restart</div>
                <div className="text-xs text-destructive">Start fresh from Level 1</div>
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
                <div className="font-bold text-lg mb-2">🎯 Mission</div>
                <p className="text-muted-foreground">Turn ₦50M into ₦81B! Stay above ₦5M or you lose.</p>
              </div>
              <div>
                <div className="font-bold text-lg mb-2">💰 Making Money</div>
                <p className="text-muted-foreground">Tap "Invest" → Pick amount → Wait 60s → Get 30% profit! Keep reinvesting to grow your wealth faster.</p>
                <div className="bg-chart-5/20 border border-chart-5/30 rounded-lg p-2 mt-2 text-xs">
                  <strong>Important:</strong> Your profit % decreases by -10% every 7 minutes. Buy items to reset it back to 30%!
                </div>
              </div>
              <div>
                <div className="font-bold text-lg mb-2">⚠️ Costs</div>
                <p className="text-muted-foreground mb-2"><strong>Living Expenses:</strong> 25% of your balance every 30 seconds</p>
                <p className="text-muted-foreground mb-2"><strong>Investment Profit Weakens:</strong> Your profit drops by -10% every 7 minutes (30% → 20% → 10% → 0%)</p>
                <p className="text-muted-foreground mb-2"><strong>Item Upkeep:</strong> Each item costs maintenance every 30s</p>
                <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-3 mt-2">
                  <p className="text-destructive text-xs font-medium">⚠️ WARNING: If your profit reaches 0%, you can't make money anymore and WILL lose the game! Buy items to reset profit to 30%.</p>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg mb-2">💡 Strategy</div>
                <p className="text-muted-foreground">• <strong>First 7 mins:</strong> Invest hard (30% profit!)</p>
                <p className="text-muted-foreground">• <strong>When profit drops:</strong> Buy cheap item to restore</p>
                <p className="text-muted-foreground">• <strong>Don't overspend:</strong> Too many items = high maintenance</p>
                <p className="text-muted-foreground">• <strong>Never reach 0%:</strong> At 0% profit, you can't earn and will lose!</p>
                <p className="text-muted-foreground">• <strong>Keep buffer:</strong> Stay above ₦10M to be safe</p>
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
