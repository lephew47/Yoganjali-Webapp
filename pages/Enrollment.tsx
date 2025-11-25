import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/content';
import {BLOG} from '../data/content';
import { authService } from '../services/authService';
import { CheckCircle, AlertTriangle, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

export const Enrollment: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const course = COURSES.find(c => c.id === courseId) || BLOG.find(e => e.id === courseId);


  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    medicalConditions: '',
    injuries: '',
    yogaExperience: 'Beginner',
    intentions: '',
    agreeToWaiver: false
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setFormData(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email
      }));
    }
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800">Course Not Found</h2>
          <button onClick={() => navigate('/programs')} className="mt-4 text-amber-600 hover:underline">Back to Programs</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate network delay for processing application
      await new Promise(resolve => setTimeout(resolve, 2000));

      // If user is logged in, enroll them in the backend
      if (currentUser) {
        await authService.enrollInCourse(course.id);
      }

      setIsProcessing(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Enrollment failed", error);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Application Received!</h2>
          <p className="text-stone-600 mb-8">
            Namaste, {formData.fullName}. You have successfully applied for <strong>{course.title}</strong>. 
            We have sent a confirmation email to {formData.email} with the next steps and payment details.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-white text-stone-600 border border-stone-200 py-3 rounded-lg font-bold hover:bg-stone-50 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/programs')} className="flex items-center text-stone-500 hover:text-stone-800 mb-6 transition">
          <ArrowLeft size={18} className="mr-2" /> Back to Programs
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Sidebar: Course Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-100 sticky top-24">
              <img src={course.image} alt={course.title} className="h-40 w-full object-cover"/>
              <div className="p-6">
                <h2 className="font-bold text-stone-900 text-lg mb-2">{course.title}</h2>
                <p className="text-stone-500 text-sm mb-4">{course.category} • {course.level}</p>
                <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                  <span className="text-stone-500 text-sm">Tuition</span>
                
                </div>
              </div>
              <div className="bg-amber-50 p-4 text-xs text-amber-800 border-t border-amber-100">
                <ShieldCheck size={14} className="inline mr-1" />
                Secure SSL Enrollment
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-stone-100">
              <h1 className="text-2xl font-serif font-bold text-stone-800 mb-2">Student Enrollment Form</h1>
              <p className="text-stone-500 text-sm mb-8">Please complete all fields to finalize your admission to the Yoganjali Global Institute.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section: Personal Details */}
                <div>
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                      <input 
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number *</label>
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Date of Birth *</label>
                      <input 
                        required
                        type="date"
                        value={formData.dob}
                        onChange={e => setFormData({...formData, dob: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Address</label>
                      <input 
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Medical & Yoga History */}
                <div className="pt-4">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">Medical & Practice History</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Current Medical Conditions (if any)</label>
                      <textarea 
                        rows={2}
                        value={formData.medicalConditions}
                        onChange={e => setFormData({...formData, medicalConditions: e.target.value})}
                        placeholder="e.g., Hypertension, Asthma, Diabetes..."
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Past Injuries / Surgeries</label>
                      <textarea 
                        rows={2}
                        value={formData.injuries}
                        onChange={e => setFormData({...formData, injuries: e.target.value})}
                        placeholder="e.g., Knee surgery 2019, Lower back pain..."
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Yoga Experience Level</label>
                        <select 
                          value={formData.yogaExperience}
                          onChange={e => setFormData({...formData, yogaExperience: e.target.value})}
                          className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option>Absolute Beginner</option>
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>Teacher</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Emergency Contact */}
                <div className="pt-4">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Contact Name *</label>
                      <input 
                        required
                        type="text"
                        value={formData.emergencyName}
                        onChange={e => setFormData({...formData, emergencyName: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Contact Phone *</label>
                      <input 
                        required
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={e => setFormData({...formData, emergencyPhone: e.target.value})}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Waiver */}
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <div className="flex items-start">
                    <input 
                      required
                      type="checkbox"
                      checked={formData.agreeToWaiver}
                      onChange={e => setFormData({...formData, agreeToWaiver: e.target.checked})}
                      className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                    />
                    <label className="ml-3 text-xs text-stone-600 leading-relaxed">
                      I declare that I am in good health and fit to participate in this course. I release Yoganjali Global Institute from liability for any injuries sustained during practice. I understand that fees are non-refundable once the course commences.
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing || !formData.agreeToWaiver}
                  className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} /> Processing Enrollment...
                    </>
                  ) : (
                    'Submit Application & Proceed'
                  )}
                </button>
                {!currentUser && (
                  <p className="text-center text-xs text-stone-500">
                    Note: An account will be created for you automatically upon submission.
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};