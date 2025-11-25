export interface Course {
  id: string;
  title: string;
  level: 'Beginner' |'Professional' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  category: 'Contemporary Yoga' | 'Science of Pranayama & Meditation' | 'Corporate Yoga & Work Life Balance' | 'Children & Family' | 'Lifestyle Stress Management'|'Yoga Therapy' |'Traditional Yoga';
  image: string;
  description: string;
}

export interface Practice {
  id: string;
  name: string;
  category: 'Asana' | 'Pranayama' | 'Dhyana'| 'Kriya' |'Chikitsa'|'Vishranti' |'Bandhas & Mudras';
  description: string;
  benefits: string[];
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  level: 'Beginner' |'Professional' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: 'Yogic Events';
  description: string;
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