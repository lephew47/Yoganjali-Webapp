import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Microscope, Activity, AlertTriangle, Wind, Layers, Loader2 } from 'lucide-react';

interface AsanaAnalysis {
  sanskritName: string;
  englishName: string;
  etymology: string;
  scientificBenefits: string[];
  anatomyFocus: string[];
  contraindications: string[];
  steps: string[];
  breathAwareness: string;
}

export const AsanaLab: React.FC = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState<AsanaAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

const fetchAnalysis = async (name: string) => {
  if (!name.trim()) return;

  setLoading(true);
  setError('');
  setData(null);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server error ${response.status}: ${text}`);
    }

    const result = await response.json();

    console.log('Frontend received:', result);

    // THIS IS THE REAL FIX
    const actualData = result.text ? result.text : result;
    setData(result as AsanaAnalysis);
    
  } catch (err: any) {
    console.error('Fetch error:', err);
    setError(err.message || 'Failed to connect');
  } finally {
    setLoading(false);
  }
};
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnalysis(input);
  };

  useEffect(() => {
    if (location.state?.asanaName) {
      fetchAnalysis(location.state.asanaName);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full text-teal-800 mb-4">
            <Microscope size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Yoga Science Lab</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Consult our live Yoga Guruji for the answers you need.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleAnalyze} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Sirsasana, Yoga Nidra, Tadasana..."
              className="w-full pl-6 pr-16 py-4 bg-white border border-stone-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 bg-teal-700 text-white rounded-full px-6 hover:bg-teal-800 transition disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-16">
            <Loader2 className="animate-spin text-teal-600 mx-auto mb-4" size={64} />
            <p className="text-stone-600 text-xl">Consulting ancient wisdom & modern science...</p>
          </div>
        )}

        {data && (
          <div className="animate-fade-in space-y-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-stone-100 text-center">
              <h2 className="text-5xl font-bold text-teal-800 font-serif mb-3">
                {data.sanskritName}
              </h2>
              <h3 className="text-2xl text-stone-600 tracking-wider">
                {data.englishName}
              </h3>
              <div className="mt-6 w-32 h-1 bg-teal-500 mx-auto rounded-full"></div>
              <p className="mt-8 text-stone-600 italic text-lg max-w-3xl mx-auto leading-relaxed">
                "{data.etymology}"
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Scientific Benefits */}
            
<div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
  <Activity className="text-emerald-600 mb-4" size={32} />
  <h3 className="font-serif text-xl font-bold text-stone-800 mb-4">Scientific Benefits</h3>
  <ul className="space-y-2 text-stone-700">
    {(Array.isArray(data?.scientificBenefits) ? data.scientificBenefits : []).map((b, i) => (
      <li key={i}>• {b}</li>
    ))}
  </ul>
</div>
{/* Anatomy Focus */}
<div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
  <Layers className="text-blue-600 mb-4" size={32} />
  <h3 className="font-serif text-xl font-bold text-stone-800 mb-4">Anatomy Focus</h3>
  <ul className="space-y-2 text-stone-700">
    {(Array.isArray(data?.anatomyFocus) ? data.anatomyFocus : []).map((a, i) => (
      <li key={i}>• {a}</li>
    ))}
  </ul>
</div>
{/* Contraindications */}
<div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-8 border border-rose-200">
  <AlertTriangle className="text-rose-600 mb-4" size={32} />
  <h3 className="font-serif text-xl font-bold text-stone-800 mb-4">Contraindications</h3>
  <ul className="space-y-2 text-stone-700">
    {(Array.isArray(data?.contraindications) ? data.contraindications : []).map((c, i) => (
      <li key={i} className="text-rose-700">Warning: {c}</li>
    ))}
  </ul>
</div>
              {/* Breath Awareness */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200 md:col-span-2 lg:col-span-3">
                <Wind className="text-indigo-600 mb-4" size={32} />
                <h3 className="font-serif text-xl font-bold text-stone-800 mb-4">Breath Awareness</h3>
                <p className="text-stone-700 text-lg leading-relaxed">
  {data?.breathAwareness || 'No breath instructions available'}
</p>
              </div>

              {/* Steps */}
<div className="bg-white rounded-2xl p-8 shadow-md border border-stone-200 md:col-span-2 lg:col-span-3">
  <h3 className="font-serif text-2xl font-bold text-stone-800 mb-6">Steps</h3>
  <ol className="space-y-4 text-stone-700 text-lg">
    {(Array.isArray(data?.steps) ? data.steps : []).map((step, i) => (
      <li key={i} className="flex gap-4">
        <span className="font-bold text-teal-600 text-xl">{i + 1}.</span>
        <span>{step}</span>
      </li>
    ))}
  </ol>
</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};