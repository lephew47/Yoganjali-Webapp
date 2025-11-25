import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Sun, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
  {/* Hero Section */}
  <section className="relative h-[80vh] flex items-center">
    <div className="absolute inset-0 z-0">
      <img 
        src="/assets/home-bg.jpg" 
        alt="Yoga Sunrise" 
        className="w-full h-full object-cover brightness-110 contrast-125"
      />
    </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Where Ancient Wisdom <br/> Meets Modern Science
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl mx-auto font-light">
            Yoganjali Global Institute brings you authentic, therapeutic, and applied yogic sciences for complete holistic well-being.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/programs" className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition duration-300 flex items-center justify-center">
              Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/auth" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-stone-900 text-white rounded-full font-medium transition duration-300">
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Our Philosophy</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-serif text-stone-800">Holistic Wellness Redefined</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl hover:bg-stone-50 transition duration-300">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-700">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-stone-800">Therapeutic Healing</h3>
              <p className="text-stone-600 leading-relaxed">
                Evidence-based practices designed to manage chronic pain, stress, and lifestyle disorders.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-stone-50 transition duration-300">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-700">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-stone-800">Mindful Science</h3>
              <p className="text-stone-600 leading-relaxed">
                Integrating neuroscience with ancient Dhyana (meditation) for optimal cognitive health.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-stone-50 transition duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-700">
                <Sun size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-stone-800">Applied Wisdom</h3>
              <p className="text-stone-600 leading-relaxed">
                Practical application of Yoga Sutras and Ayurveda in modern daily life and diet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Teaser */}
      <section className="py-20 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-900/50 px-4 py-1 rounded-full text-amber-400 mb-6">
                <Sparkles size={16} />
                <span className="text-sm font-bold uppercase">New Feature</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Meet Your Personal <br/>Yoga Therapist</h2>
              <p className="text-lg text-stone-300 mb-8">
                Powered by advanced Gemini technology, our AI assistant provides personalized routine suggestions, pain management advice, and mental wellness check-ins 24/7.
              </p>
              <Link to="/auth" className="inline-block bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition">
                Try AI Assistant Free
              </Link>
            </div>
            <div className="bg-stone-800 p-8 rounded-3xl border border-stone-700 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-stone-600 flex-shrink-0"></div>
                  <div className="bg-stone-700 p-3 rounded-lg rounded-tl-none text-sm text-stone-200">
                    I've been feeling very anxious and have lower back pain. What can I do?
                  </div>
                </div>
                <div className="flex items-start space-x-4 flex-row-reverse space-x-reverse">
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex-shrink-0 flex items-center justify-center">
                    <Sparkles size={14} color="white"/>
                  </div>
                  <div className="bg-amber-900/30 border border-amber-800/50 p-3 rounded-lg rounded-tr-none text-sm text-stone-200">
                    I'm sorry to hear that. For lower back pain and anxiety, I recommend <strong>Balasana (Child's Pose)</strong> to gently stretch the spine and calm the mind, followed by <strong>Nadi Shodhana</strong> pranayama. Would you like a guided video?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-stone-800">Student Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-xl shadow-sm flex items-start space-x-4 border border-stone-100">
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="text-stone-600 italic mb-4">"{t.text}"</p>
                  <h4 className="font-bold text-stone-900">{t.name}</h4>
                  <p className="text-amber-600 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join Our Global Sangha</h2>
          <p className="text-amber-100 mb-8">Receive weekly tips on Ayurveda, Asanas, and exclusive course discounts.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-6 py-3 rounded-full text-stone-900 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button type="submit" className="px-8 py-3 bg-stone-900 hover:bg-stone-800 rounded-full font-bold transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};