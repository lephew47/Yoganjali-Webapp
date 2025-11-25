import { Course, Practice } from '../types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Hatha Yoga',
    level: 'Intermediate',
    duration: '200 Hours',
    
    category: 'Contemporary Yoga',
    image: '/assets/course1-bg.jpg',
    description: 'A comprehensive foundation in Hatha and Ashtanga yoga, anatomy, and philosophy.'
  },
  {
    id: 'c2',
    title: 'Pranyama for Stress Relief',
    level: 'Advanced',
    duration: '1 Year',
   
    category: 'Science of Pranayama & Meditation',
    image: '/assets/course2-bg.jpg',
    description: 'Specialized training to treat chronic ailments using applied yogic sciences.'
  },
  {
    id: 'c3',
    title: 'Relaxation and Energy Balance',
    level: 'All Levels',
    duration: '4 Weeks',
    
    category: 'Corporate Yoga & Work Life Balance',
    image: '/assets/course3-bg.jpg',
    description: 'Master the art of Pranayama to manage stress, anxiety, and hypertension.'
  },
  {
    id: 'c4',
    title: 'Psychosomatic Treatment',
    level: 'Beginner',
    duration: '8 Weeks',
    
    category: 'Yoga Therapy',
    image: '/assets/course4-bg.jpg',
    description: 'Learn the basics of Dinacharya (daily routine) and Sattvic diet.'
  },
  {
    id: 'c5',
    title: 'Weight Management',
    level: 'Beginner',
    duration: '50 Hours',
    
    category: 'Lifestyle Stress Management',
    image: '/assets/course5-bg.jpg',
    description: 'Fun and engaging methods to teach mindfulness and movement to children.'
  }
];

export const PRACTICES: Practice[] = [
  {
    id: 'p1',
    name: 'Hatha Yoga',
    category: 'Traditional',
    description: 'The physical branch of yoga that uses postures (asanas) to purify the body.',
    benefits: ['Improved flexibility', 'Muscle tone', 'Stress reduction'],
    image: '/assets/course6-bg.jpg'
  },
  {
    id: 'p2',
    name: 'Yoga Nidra',
    category: 'Therapeutic',
    description: 'A state of consciousness between waking and sleeping, induced by guided meditation.',
    benefits: ['Deep relaxation', 'Better sleep', 'Reduced anxiety'],
    image: '/assets/practice1-bg.jpg'
  },
  {
    id: 'p3',
    name: 'Nadi Shodhana',
    category: 'Applied',
    description: 'Alternate nostril breathing technique to balance the left and right hemispheres.',
    benefits: ['Calms the mind', 'Balances hormones', 'Improves focus'],
    image: '/assets/practice2-bg.jpg'
  },
  {
    id: 'p4',
    name: 'Kundalini Yoga',
    category: 'Traditional',
    description: 'A spiritual school of yoga focused on awakening the energy at the base of the spine.',
    benefits: ['Spiritual awakening', 'Increased energy', 'Emotional balance'],
    image: '/assets/practice4-bg.jpg'
  },
  {
    id: 'p5',
    name: 'Shatkarmas',
    category: 'Applied',
    description: 'The six purification techniques described in the Hatha Yoga Pradipika.',
    benefits: ['Detoxification', 'Improved digestion', 'Clarity of mind'],
    image: '/assets/practice3-bg.jpg'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Yoga Teacher",
    text: "YGIAYS transformed my understanding of classical yoga. The scientific approach to spirituality is unmatched.",
    image: "https://picsum.photos/seed/person1/100/100"
  },
  {
    id: 2,
    name: "Rajiv Kapoor",
    role: "Therapy Student",
    text: "The Yoga Therapy diploma gave me the tools to help my patients with chronic back pain naturally.",
    image: "https://picsum.photos/seed/person2/100/100"
  }
];