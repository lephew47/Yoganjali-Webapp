export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  category: 'Contemporary Yoga' | 'Science of Pranayama & Meditation' | 'Corporate Yoga & Work Life Balance' | 'Lifestyle Stress Management'|'Yoga Therapy';
  image: string;
  description: string;
}

export interface Practice {
  id: string;
  name: string;
  category: 'Traditional' | 'Applied' | 'Therapeutic';
  description: string;
  benefits: string[];
  image: string;
}

export interface User {
  name: string;
  email: string;
  isPremium: boolean;
  enrolledCourses: string[];
  progress: {
    meditationMinutes: number;
    sessionsCompleted: number;
  };
  dailyProgress?: Record<string, number>; // Key: "Mon", "Tue", etc.
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}