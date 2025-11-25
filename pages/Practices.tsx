import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRACTICES } from '../data/content';
import { Search, Filter, Microscope } from 'lucide-react';

export const Practices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('All');
  const navigate = useNavigate();

  const filteredPractices = PRACTICES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleViewTechnique = (name: string) => {
    navigate('/asana-lab', { state: { asanaName: name } });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Library of Yogic Practices</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">An encyclopedia of traditional and applied techniques for physical health, mental clarity, and spiritual growth.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-stone-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-stone-400" size={20} />
            <input 
              type="text" 
              placeholder="Search practices..." 
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All', 'Traditional', 'Applied', 'Therapeutic'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  category === cat 
                    ? 'bg-stone-800 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPractices.map(practice => (
            <div key={practice.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group border border-stone-100">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={practice.image} 
                  alt={practice.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 uppercase tracking-wide shadow-sm">
                  {practice.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition">{practice.name}</h3>
                <p className="text-stone-600 text-sm mb-4 line-clamp-2">{practice.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {practice.benefits.map((b, i) => (
                      <span key={i} className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-md">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleViewTechnique(practice.name)}
                  className="w-full flex items-center justify-center space-x-2 border border-stone-200 text-stone-800 py-2 rounded-lg hover:bg-stone-800 hover:text-white transition text-sm font-bold"
                >
                  <Microscope size={16} />
                  <span>Analyze Technique</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};