// pages/Blog.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG } from '../data/content';

export const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-800">Yogic Events</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Deeply immersive retreats, conferences, and special programs for spiritual growth and wellness.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-stone-100">
              
              <img src={event.image} alt={event.title} className="h-48 w-full object-cover"/>
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{event.title}</h3>
                <p className="text-stone-600 text-sm mb-4 line-clamp-3">{event.description}</p>
              </div>

              <div className="p-6 pt-0">
                <button 
                  onClick={() => navigate(`/enroll/${event.id}`)}
                  className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 transition font-bold"
                >
                  Enroll Now
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
