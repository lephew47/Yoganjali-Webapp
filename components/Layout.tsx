import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, Activity, Flower2, BookOpen, Phone, LogIn, Microscope } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode; isAuthenticated: boolean; onLogout: () => void }> = ({ children, isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-amber-600 font-semibold' : 'text-stone-600 hover:text-amber-600';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
  {/* Navigation */}
  <nav className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            
            {/* Updated Logo */}
            <img
              src={'/assets/logo.png'}
              alt="Yoganjali Logo"
              className="h-20 w-20 object-contain"
            />

            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-stone-800 leading-tight">
                Yoganjali
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">
                Global Institute
              </span>
            </div>
          </Link>
        </div>


            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/practices" className={isActive('/practices')}>Practices</Link>
              <Link to="/programs" className={isActive('/programs')}>Programs</Link>
              <Link to="/asana-lab" className={`${isActive('/asana-lab')} flex items-center space-x-1`}>
                <Microscope size={16} />
                <span>Science Lab</span>
              </Link>
              <Link to="/blog" className={isActive('/blog')}>Journal</Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="flex items-center space-x-1 text-amber-700 bg-amber-50 px-4 py-2 rounded-full hover:bg-amber-100 transition">
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link to="/auth" className="flex items-center space-x-1 text-white bg-stone-800 px-5 py-2 rounded-full hover:bg-stone-700 transition">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 hover:text-stone-900">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/practices" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Practices Library</Link>
              <Link to="/programs" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Courses & Programs</Link>
              <Link to="/asana-lab" className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-stone-50" onClick={() => setIsMenuOpen(false)}>Asana Science Lab</Link>
              <Link to="/auth" className="block px-3 py-2 rounded-md text-base font-medium text-amber-700 bg-amber-50 mt-2" onClick={() => setIsMenuOpen(false)}>Student Portal</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-0.5 text-stone-100 mb-4">
        
              <img
              src={'/assets/logo2.png'}
              alt="Yoganjali Logo"
              className="h-20 w-20 object-contain"
              />
               <div className="flex flex-col"></div>
                <span className="font-serif font-bold text-lg">Yoganjali</span>
              </div>
              <p className="text-sm leading-relaxed">
                Bridging the gap between ancient wisdom and modern science. Join our global community of seekers and healers.
              </p>
            </div>
            <div>
              <h3 className="text-stone-100 font-bold uppercase tracking-wider text-sm mb-4">Institute</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-amber-500 transition">Our Story</Link></li>
                <li><Link to="/programs" className="hover:text-amber-500 transition">Accreditation</Link></li>
                <li><Link to="/contact" className="hover:text-amber-500 transition">Faculty</Link></li>
                <li><Link to="/legal" className="hover:text-amber-500 transition">Terms & Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-stone-100 font-bold uppercase tracking-wider text-sm mb-4">Practices</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/practices" className="hover:text-amber-500 transition">Therapy</Link></li>
                <li><Link to="/practices" className="hover:text-amber-500 transition">Hatha Yoga</Link></li>
                <li><Link to="/asana-lab" className="hover:text-amber-500 transition">Science Lab</Link></li>
                <li><Link to="/practices" className="hover:text-amber-500 transition">Ayurveda</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-stone-100 font-bold uppercase tracking-wider text-sm mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+254 (703) 633-408</span>
                </li>
                <li>yoganjaliinstitute@gmail.com</li>
                <li>Peponi Rd 7, Nairobi</li>
              </ul>
              <div className="mt-6">
                <p className="text-xs text-stone-500">© 2024 Yoganjali Global Institute. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
