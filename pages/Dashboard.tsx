import React, { useState, useEffect, useMemo } from 'react';
import { User, Clock, BookOpen, Award, Settings, LogOut, Check, X, Sparkles, Lock, CreditCard, Loader2, Play, Pause, Square } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { authService } from '../services/authService';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onUpgrade: () => void;
  onUnsubscribe: () => void;
  onProgressUpdate?: (minutes: number, dayName: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpgrade, onUnsubscribe, onProgressUpdate }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'security' | 'subscription'>('security');
  const [isProcessing, setIsProcessing] = useState(false);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timerLoading, setTimerLoading] = useState(false);

  // Settings Form States
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && !isTimerPaused) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerActive && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isTimerPaused, timerSeconds]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? hours + ':' : ''}${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimerStart = () => {
    setIsTimerActive(true);
    setIsTimerPaused(false);
  };

  const handleTimerPause = () => {
    setIsTimerPaused(true);
  };

  const handleTimerFinish = async () => {
    setIsTimerActive(false);
    setIsTimerPaused(false);
    setTimerLoading(true);

    const minutesCompleted = Math.ceil(timerSeconds / 60);
    
    if (minutesCompleted > 0) {
      try {
        const { dayName, minutes } = await authService.updateUserProgress(minutesCompleted);
        if (onProgressUpdate) {
          onProgressUpdate(minutes, dayName);
        }
      } catch (error) {
        console.error("Failed to save progress", error);
      }
    }
    
    setTimerSeconds(0);
    setTimerLoading(false);
  };

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate API payment call
    setTimeout(() => {
      onUpgrade();
      setIsProcessing(false);
      setShowUpgradeModal(false);
      if (showSettingsModal) setSettingsTab('subscription');
    }, 1500);
  };

  const handleUnsubscribe = () => {
    if (window.confirm("Are you sure you want to cancel your premium subscription?")) {
      setIsProcessing(true);
      setTimeout(() => {
        onUnsubscribe();
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setPasswordStatus('error');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPasswordStatus('success');
      setPasswordData({ current: '', new: '', confirm: '' });
      setTimeout(() => setPasswordStatus('idle'), 3000);
    }, 1500);
  };

  // Generate Dynamic Graph Data
  const graphData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      minutes: user.dailyProgress ? (user.dailyProgress[day] || 0) : 0
    }));
  }, [user.dailyProgress]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 relative">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-800">Namaste, {user.name}</h1>
              <p className="text-stone-500 mt-1">Your journey to wellness continues.</p>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center text-stone-500 hover:text-red-600 transition"
            >
              <LogOut size={20} className="mr-2" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Chart */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Interactive Timer Widget & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Timer Card */}
              <div className="bg-stone-900 p-6 rounded-xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-amber-600 rounded-full blur-3xl opacity-20"></div>
                
                <div className="flex items-center justify-between z-10">
                  <span className="text-stone-400 text-sm font-bold uppercase tracking-wider">Mindfulness Timer</span>
                  <Clock className="text-amber-500" size={20} />
                </div>
                
                <div className="text-center my-6 z-10">
                  <span className="text-5xl font-mono font-bold tracking-wider">
                    {formatTime(timerSeconds)}
                  </span>
                  <p className="text-stone-400 text-xs mt-2">
                    {isTimerActive && !isTimerPaused ? 'Session in Progress...' : 'Ready to Meditate'}
                  </p>
                </div>

                <div className="flex justify-center space-x-4 z-10">
                  {!isTimerActive || isTimerPaused ? (
                    <button 
                      onClick={handleTimerStart}
                      className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition shadow-lg flex items-center justify-center"
                    >
                      <Play size={24} fill="currentColor" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleTimerPause}
                      className="bg-stone-700 hover:bg-stone-600 text-white p-3 rounded-full transition shadow-lg flex items-center justify-center"
                    >
                      <Pause size={24} fill="currentColor" />
                    </button>
                  )}
                  
                  {(timerSeconds > 0) && (
                    <button 
                      onClick={handleTimerFinish}
                      disabled={timerLoading}
                      className="bg-stone-100 hover:bg-white text-stone-900 p-3 rounded-full transition shadow-lg flex items-center justify-center disabled:opacity-50"
                    >
                      {timerLoading ? <Loader2 className="animate-spin" size={24}/> : <Square size={24} fill="currentColor" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Stat Cards Stack */}
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between">
                   <div>
                     <span className="text-stone-500 text-sm font-medium block mb-1">Total Minutes</span>
                     <span className="text-2xl font-bold text-stone-800">{user.progress?.meditationMinutes || 0}</span>
                   </div>
                   <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
                     <Clock size={24} />
                   </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between">
                   <div>
                     <span className="text-stone-500 text-sm font-medium block mb-1">Sessions Completed</span>
                     <span className="text-2xl font-bold text-stone-800">{user.progress?.sessionsCompleted || 0}</span>
                   </div>
                   <div className="bg-teal-50 p-3 rounded-lg text-teal-600">
                     <Check size={24} />
                   </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-stone-800">Mindfulness Minutes (Weekly)</h3>
                <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">Last 7 Days</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px'}}
                      itemStyle={{color: '#d97706'}}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#d97706" 
                      strokeWidth={3} 
                      dot={{fill: '#d97706', strokeWidth: 2}} 
                      activeDot={{r: 6}} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-bold text-stone-800 mb-6">My Courses</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src="https://picsum.photos/seed/yoga1/100/100" alt="Course" className="w-12 h-12 rounded-md object-cover"/>
                    <div>
                      <h4 className="font-bold text-stone-800">200-Hour Yoga Teacher Training</h4>
                      <div className="w-32 bg-stone-200 rounded-full h-1.5 mt-2">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-amber-600 hover:text-amber-700">Resume</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile & AI Upsell */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <div className="text-center mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif ${user.isPremium ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700'}`}>
                  {user.isPremium ? <Sparkles size={32} /> : user.name.charAt(0)}
                </div>
                <h3 className="font-bold text-xl text-stone-800">{user.name}</h3>
                <p className="text-stone-500">{user.email}</p>
                <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${user.isPremium ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}`}>
                  {user.isPremium ? 'Premium Member' : 'Free Plan'}
                </div>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowSettingsModal(true)}
                  className="w-full flex items-center justify-between p-3 hover:bg-stone-50 rounded-lg transition text-stone-600"
                >
                  <span>Account Settings</span>
                  <Settings size={16} />
                </button>
                <button className="w-full flex items-center justify-between p-3 hover:bg-stone-50 rounded-lg transition text-stone-600 cursor-not-allowed opacity-50">
                  <span>Billing History</span>
                  <Award size={16} />
                </button>
              </div>
            </div>

            {!user.isPremium && (
              <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-6 rounded-xl shadow-lg text-white">
                <h3 className="font-serif font-bold text-xl mb-2">Upgrade to Premium</h3>
                <p className="text-amber-100 text-sm mb-4">Get unlimited access to AI Therapy, 300+ Advanced Classes, and Certification discounts.</p>
                <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-white text-amber-800 font-bold py-2 rounded-lg hover:bg-amber-50 transition"
                >
                  View Plans
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
               <h2 className="text-2xl font-serif font-bold text-stone-800">Account Settings</h2>
               <button onClick={() => setShowSettingsModal(false)} className="text-stone-400 hover:text-stone-600">
                 <X size={24} />
               </button>
            </div>
            <div className="flex flex-col md:flex-row h-full flex-grow overflow-hidden">
              {/* Sidebar */}
              <div className="w-full md:w-1/3 bg-stone-50 p-4 border-r border-stone-100 space-y-2">
                <button 
                  onClick={() => setSettingsTab('security')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${settingsTab === 'security' ? 'bg-white shadow-sm text-amber-700' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  <Lock size={18} />
                  <span>Security</span>
                </button>
                <button 
                  onClick={() => setSettingsTab('subscription')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${settingsTab === 'subscription' ? 'bg-white shadow-sm text-amber-700' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  <CreditCard size={18} />
                  <span>Subscription</span>
                </button>
              </div>
              
              {/* Content */}
              <div className="w-full md:w-2/3 p-6 overflow-y-auto">
                {settingsTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-stone-800">Change Password</h3>
                      <p className="text-sm text-stone-500">Ensure your account stays secure.</p>
                    </div>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Current Password</label>
                        <input 
                          type="password" 
                          value={passwordData.current}
                          onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                          className="w-full p-2 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">New Password</label>
                        <input 
                          type="password" 
                          value={passwordData.new}
                          onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                          className="w-full p-2 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                          className={`w-full p-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 text-sm ${passwordStatus === 'error' ? 'border-red-300' : 'border-stone-200'}`}
                        />
                        {passwordStatus === 'error' && <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>}
                      </div>
                      
                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={isProcessing || !passwordData.current || !passwordData.new}
                          className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-stone-800 disabled:opacity-50 flex items-center"
                        >
                          {isProcessing ? <Loader2 className="animate-spin mr-2" size={14}/> : 'Update Password'}
                        </button>
                        {passwordStatus === 'success' && <p className="text-xs text-green-600 mt-2 font-bold">Password updated successfully.</p>}
                      </div>
                    </form>
                  </div>
                )}

                {settingsTab === 'subscription' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-stone-800">My Subscription</h3>
                      <p className="text-sm text-stone-500">Manage your plan and billing details.</p>
                    </div>
                    
                    <div className={`p-4 rounded-xl border ${user.isPremium ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Current Plan</span>
                        {user.isPremium && <span className="bg-amber-200 text-amber-900 text-[10px] px-2 py-1 rounded-full font-bold">ACTIVE</span>}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className={`text-2xl font-serif font-bold ${user.isPremium ? 'text-amber-800' : 'text-stone-800'}`}>
                            {user.isPremium ? 'Yogi Plan' : 'Seeker Plan'}
                          </h4>
                          <p className="text-sm text-stone-600 mt-1">
                            {user.isPremium ? '$49.00 / month' : 'Free Forever'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {user.isPremium ? (
                      <div className="space-y-4">
                        <p className="text-sm text-stone-600">Your next billing date is <strong>October 24, 2024</strong>.</p>
                        <button 
                          onClick={handleUnsubscribe}
                          disabled={isProcessing}
                          className="w-full border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition flex items-center justify-center"
                        >
                          {isProcessing ? <Loader2 className="animate-spin mr-2" size={14}/> : 'Cancel Subscription'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-stone-600">Upgrade to unlock unlimited AI therapy and advanced certification courses.</p>
                        <button 
                          onClick={() => { setShowSettingsModal(false); setShowUpgradeModal(true); }}
                          className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-700 transition"
                        >
                          Upgrade Plan
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
                 <div>
                   <h2 className="text-2xl font-serif font-bold text-stone-800">Invest in Your Well-being</h2>
                   <p className="text-stone-500 text-sm">Choose the plan that aligns with your journey.</p>
                 </div>
                 <button onClick={() => setShowUpgradeModal(false)} className="text-stone-400 hover:text-stone-600">
                   <X size={24} />
                 </button>
              </div>
              
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                 {/* Free */}
                 <div className="border border-stone-200 rounded-xl p-6 flex flex-col">
                    <div className="mb-4">
                       <h3 className="text-lg font-bold text-stone-800">Seeker</h3>
                       <p className="text-3xl font-serif font-bold mt-2">$0</p>
                       <p className="text-stone-500 text-sm">Forever Free</p>
                    </div>
                    <ul className="space-y-3 text-sm text-stone-600 mb-8 flex-grow">
                       <li className="flex items-center"><Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> Basic Yoga Library</li>
                       <li className="flex items-center"><Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> Community Access</li>
                       <li className="flex items-center"><Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> 1 AI Chat / Day</li>
                    </ul>
                    <button disabled className="w-full py-2 bg-stone-100 text-stone-400 font-bold rounded-lg cursor-not-allowed">Current Plan</button>
                 </div>

                 {/* Basic */}
                 <div className="border border-stone-200 rounded-xl p-6 flex flex-col relative overflow-hidden">
                    <div className="mb-4">
                       <h3 className="text-lg font-bold text-stone-800">Practitioner</h3>
                       <p className="text-3xl font-serif font-bold mt-2">$29<span className="text-base font-sans font-normal text-stone-500">/mo</span></p>
                       <p className="text-stone-500 text-sm">Billed monthly</p>
                    </div>
                    <ul className="space-y-3 text-sm text-stone-600 mb-8 flex-grow">
                       <li className="flex items-center"><Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> Full Yoga Library</li>
                       <li className="flex items-center"><Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> Live Weekly Classes</li>
                       <li className="flex items-center"><Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> 10 AI Chats / Day</li>
                    </ul>
                     <button 
                        onClick={handleSubscribe}
                        className="w-full py-2 border border-amber-600 text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition"
                     >
                       Select Basic
                     </button>
                 </div>

                 {/* Premium */}
                 <div className="border-2 border-amber-500 bg-amber-50/30 rounded-xl p-6 flex flex-col relative transform md:-translate-y-2 shadow-lg">
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                    <div className="mb-4">
                       <h3 className="text-lg font-bold text-amber-800">Yogi</h3>
                       <p className="text-3xl font-serif font-bold mt-2 text-amber-900">$49<span className="text-base font-sans font-normal text-stone-600">/mo</span></p>
                       <p className="text-stone-500 text-sm">Billed monthly</p>
                    </div>
                    <ul className="space-y-3 text-sm text-stone-700 mb-8 flex-grow">
                       <li className="flex items-center"><Check size={16} className="text-amber-600 mr-2 flex-shrink-0" /> All "Practitioner" Features</li>
                       <li className="flex items-center"><Check size={16} className="text-amber-600 mr-2 flex-shrink-0" /> <span className="font-bold">Unlimited AI Therapy</span></li>
                       <li className="flex items-center"><Check size={16} className="text-amber-600 mr-2 flex-shrink-0" /> Personal 1-on-1 Session (1/mo)</li>
                       <li className="flex items-center"><Check size={16} className="text-amber-600 mr-2 flex-shrink-0" /> Certification Discounts</li>
                       <li className="flex items-center"><Check size={16} className="text-amber-600 mr-2 flex-shrink-0" /> Advanced Analytics</li>
                    </ul>
                     <button 
                       onClick={handleSubscribe}
                       disabled={isProcessing}
                       className="w-full py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition shadow-md flex justify-center items-center"
                     >
                       {isProcessing ? (
                         <>
                           <Clock className="animate-spin mr-2" size={18}/> Processing...
                         </>
                       ) : 'Upgrade Now'}
                     </button>
                 </div>
              </div>
              
              <div className="p-6 bg-stone-50 text-center text-xs text-stone-400 rounded-b-2xl">
                Secure payment powered by Stripe. By upgrading, you agree to our Terms of Service and Health Disclaimer.
              </div>
           </div>
        </div>
      )}
    </div>
  );
};