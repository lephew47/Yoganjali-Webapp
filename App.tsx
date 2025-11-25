import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AITherapy } from './pages/AITherapy';
import { Practices } from './pages/Practices';
import { AsanaLab } from './pages/AsanaLab';
import { Enrollment } from './pages/Enrollment';
import { COURSES } from './data/content';
import { User, CheckCircle, Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { authService } from './services/authService';
import { User as UserType } from './types';
import { auth } from './firebaseConfig';

// --- Simple Components for other pages to keep file count low ---

const Programs: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-stone-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-stone-800">Classical Yoga Programs</h1>
          <p className="mt-4 text-xl text-stone-600">Experience Harmonious, Relaxing, Joyous & Rejuvanating Sessions.</p>
        </div>
        <div className="space-y-12">
          {['Contemporary Yoga', 'Science of Pranayama & Meditation', 'Corporate Yoga & Work Life Balance' , 'Lifestyle Stress Management','Yoga Therapy'].map((cat) => (
            <div key={cat}>
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6 border-l-4 border-amber-600 pl-4">{cat} Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COURSES.filter(c => c.category === cat).map(course => (
                   <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-stone-100">
                      <img src={course.image} alt={course.title} className="h-48 w-full object-cover"/>
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                           <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded">{course.level}</span>
                           
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{course.title}</h3>
                        <p className="text-stone-600 text-sm mb-4">{course.description}</p>
                        <div className="text-xs text-stone-500 mb-4 flex items-center">
                           <span className="font-bold mr-1">Duration:</span> {course.duration}
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <button 
                          onClick={() => navigate(`/enroll/${course.id}`)}
                          className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 transition font-bold"
                        >
                          Enroll Now
                        </button>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => (
  <div className="bg-white py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8 text-center">Our Lineage & Vision</h1>
      <div className="prose prose-lg prose-stone mx-auto">
        <p>Founded in Rishikesh, the Yoganjali Global Institute of Applied Yogic Sciences (YGIAYS) stands as a beacon of authentic knowledge. We do not view Yoga merely as an exercise, but as a complete medical and spiritual science.</p>
        <p>Our founder, <strong>Dr. Aryan Vashishth</strong>, spent 20 years in the Himalayas before earning his PhD in Neurobiology. This unique blend of classical wisdom and modern science forms the bedrock of our curriculum.</p>
        <h3 className="text-2xl font-serif font-bold mt-8 mb-4">Our Mission</h3>
        <ul className="list-disc pl-6 space-y-2">
           <li>To scientifically validate yogic therapies.</li>
           <li>To provide accessible, affordable wellness education globally.</li>
           <li>To integrate Ayurveda and Yoga into mainstream healthcare.</li>
        </ul>
      </div>
    </div>
  </div>
);

const Contact: React.FC = () => (
  <div className="bg-stone-50 py-20 min-h-screen">
    <div className="max-w-3xl mx-auto px-4">
       <div className="bg-white p-8 rounded-2xl shadow-sm">
         <h1 className="text-3xl font-serif font-bold mb-6 text-center">Contact Us</h1>
         <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
              <input type="text" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input type="email" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea rows={4} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"></textarea>
            </div>
            <button className="w-full bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition">Send Message</button>
         </form>
       </div>
    </div>
  </div>
);

const Auth: React.FC<{ onLogin: (user: UserType) => void }> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
    
    const name = nameInput ? nameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const password = passwordInput ? passwordInput.value : '';

    try {
      let user: UserType;
      if (isSignup) {
        if (!name) throw new Error("Name is required.");
        user = await authService.signup(name, email, password);
      } else {
        user = await authService.login(email, password);
      }
      onLogin(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            {isSignup ? 'Begin Your Journey' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {isSignup ? 'Join the global community' : 'Sign in to access your dashboard'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center">
            <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignup && (
               <input name="name" type="text" required placeholder="Full Name" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm" />
            )}
            <input name="email" type="email" required placeholder="Email address" className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm ${!isSignup ? 'rounded-t-md' : ''}`} />
            
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="Password" 
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-20 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {isSignup && (
            <div className="flex items-center">
              <input type="checkbox" required className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded" />
              <label className="ml-2 block text-xs text-stone-900">
                I agree to the Health Disclaimer and Terms of Service.
              </label>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>
        <div className="text-center">
          <button onClick={toggleMode} className="text-sm text-amber-700 hover:text-amber-900 font-medium">
            {isSignup ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC = () => (
    <div className="py-20 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold mb-12 text-center">Yogic Wisdom Journal</h1>
        <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <img src={`https://picsum.photos/seed/blog${i}/400/250`} className="w-full h-48 object-cover" alt="Blog" />
                    <div className="p-6">
                            <span className="text-amber-600 text-xs font-bold uppercase">Mindfulness</span>
                        <h3 className="text-xl font-bold mt-2 mb-2">Understanding the 5 Kleshas</h3>
                        <p className="text-stone-500 text-sm">Why do we suffer? Patanjali's Yoga Sutras explain the root causes of mental pain...</p>
                        <button className="mt-4 text-stone-900 font-bold text-sm hover:text-amber-600">Read Article &rarr;</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

// --- Main App Component ---

export const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await authService.getUserProfile(firebaseUser.uid);
          if (profile) {
            setUser(profile);
          } else {
             setUser({
                name: firebaseUser.displayName || 'Student',
                email: firebaseUser.email || '',
                isPremium: false,
                enrolledCourses: [],
                progress: { meditationMinutes: 0, sessionsCompleted: 0 },
                dailyProgress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
             });
          }
        } catch (e) {
           setUser({
              name: firebaseUser.displayName || 'Student',
              email: firebaseUser.email || '',
              isPremium: false,
              enrolledCourses: [],
              progress: { meditationMinutes: 0, sessionsCompleted: 0 },
              dailyProgress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
           });
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData: UserType) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleUpgrade = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      authService.updateUser(updatedUser).then(() => {
         setUser(updatedUser);
      });
    }
  };

  const handleUnsubscribe = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: false };
      authService.updateUser(updatedUser).then(() => {
         setUser(updatedUser);
      });
    }
  };

  // Handler for progress updates (Meditation Timer)
  const handleProgressUpdate = (addedMinutes: number, dayName: string) => {
    if (user) {
      const updatedDaily = { ...user.dailyProgress };
      updatedDaily[dayName] = (updatedDaily[dayName] || 0) + addedMinutes;

      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          meditationMinutes: user.progress.meditationMinutes + addedMinutes,
          sessionsCompleted: user.progress.sessionsCompleted + 1
        },
        dailyProgress: updatedDaily
      };
      setUser(updatedUser);
    }
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-amber-600" size={32}/></div>;
    if (!user) return <Navigate to="/auth" replace />;
    return <>{children}</>;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-amber-600 mb-4" size={48}/>
          <p className="text-stone-500 font-serif">Connecting to Institute...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Layout isAuthenticated={!!user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/asana-lab" element={<AsanaLab />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/enroll/:courseId" element={<Enrollment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/legal" element={<div className="p-20 text-center">Terms & Privacy Content Placeholder</div>} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto pt-8 px-4 gap-8">
                   <div className="w-full">
                     <Dashboard 
                        user={user} 
                        onLogout={handleLogout} 
                        onUpgrade={handleUpgrade} 
                        onUnsubscribe={handleUnsubscribe}
                        onProgressUpdate={handleProgressUpdate}
                     />
                     <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-amber-900 text-lg">Need Guidance?</h3>
                            <p className="text-amber-700 text-sm">Talk to your AI Therapy Assistant now.</p>
                        </div>
                        <a href="#/ai-therapy" className="bg-amber-600 text-white px-6 py-2 rounded-full font-bold hover:bg-amber-700 transition">
                            Open Chat
                        </a>
                     </div>
                   </div>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-therapy" 
            element={
              <ProtectedRoute>
                <AITherapy />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;