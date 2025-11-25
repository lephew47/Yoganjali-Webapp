import { Course, Practice, Blog } from '../types';
export const COURSES: Course[] = [
  {
    id: 'c01',
    title: '200-Hour Hatha Yoga Teacher Training',
    level: 'Intermediate',
    duration: '200 Hours',
    category: 'Traditional Yoga',
    image: '/assets/200hrt.png',
    description: 'Yoga Alliance-certified immersive training in classical Hatha, philosophy, anatomy, alignment, and teaching methodology.'
  },
  {
    id: 'c02',
    title: '300-Hour Advanced Yoga Studies',
    level: 'Advanced',
    duration: '300 Hours',
    category: 'Traditional Yoga',
    image: '/assets/300hrt.png',
    description: 'Deep dive into Kundalini, Tantra, Sanskrit, advanced pranayama, bandhas, mudras, and therapeutic applications.'
  },
  
  {
    id: 'c03',
    title: 'Yoga Therapy Certification',
    level: 'Professional',
    duration: '100 Hours',
    category: 'Yoga Therapy',
    image: '/assets/yogatherapy.png',
    description: 'Clinical application of yoga for back pain, diabetes, hypertension, PCOS, anxiety, and psychosomatic disorders.'
  },
  {
    id: 'c04',
    title: 'Prenatal & Postnatal Yoga Teacher Training',
    level: 'Professional',
    duration: '85 Hours',
    category: 'Yoga Therapy',
    image: '/assets/prenatalyoga.png',
    description: 'Safe practices for pregnancy, childbirth preparation, postpartum recovery, and mother-baby bonding.'
  },
  {
    id: 'c05',
    title: 'Pranayama, Mudra & Bandha Mastery',
    level: 'Intermediate',
    duration: '60 Hours',
    category: 'Science of Pranayama & Meditation',
    image: '/assets/pranayamamastery.png',
    description: 'Classical 8 pranayamas, three bandhas, mudras, kumbhaka, and energy lock techniques.'
  },
  {
    id: 'c06',
    title: 'Yoga Nidra Facilitator Training',
    level: 'All Levels',
    duration: '40 Hours',
    category: 'Science of Pranayama & Meditation',
    image: '/assets/yoganidratraining.png',
    description: 'Learn to guide authentic traditional and iRest-style Yoga Nidra for deep healing and relaxation.'
  },
  {
    id: 'c07',
    title: 'Restorative & Yin Yoga Immersion',
    level: 'All Levels',
    duration: '50 Hours',
    category: 'Yoga Therapy',
    image: '/assets/restorativeimmersion.png',
    description: 'Healing through long-held passive poses, props, and nervous system regulation.'
  },
  {
    id: 'c08',
    title: 'Kids Yoga Teacher Training',
    level: 'Professional',
    duration: '30 Hours',
    category: 'Children & Family',
    image: '/assets/kidsyoga.png',
    description: 'Playful, creative yoga for children aged 3–12 using stories, games, music, and mindfulness.'
  },
  {
    id: 'c09',
    title: 'Corporate Wellness Program',
    level: 'All Levels',
    duration: 'Custom',
    category: 'Corporate Yoga & Work Life Balance',
    image: '/assets/corporateyoga.png',
    description: 'Desk yoga, chair stretches, breathwork, and mindfulness for workplace stress reduction.'
  },
  {
    id: 'c10',
    title: 'Introduction to Sanskrit & Mantra',
    level: 'All Levels',
    duration: '6 Weeks',
    category: 'Contemporary Yoga',
    image: '/assets/sanskritmantra.png',
    description: 'Learn correct pronunciation of key yoga mantras, basic Sanskrit, and their spiritual significance.'
  },
 {
    id: 'c11',
    title: 'Yogic Foundation Level 1',
    level: 'Beginner',
    duration: '8 Weeks',
    category: 'Contemporary Yoga',
    image: '/assets/yogicfoundation.png',
    description: 'Complete beginner course covering basic asanas, breathing, relaxation, and yogic lifestyle.'
  },
  {
    id: 'c15',
    title: '30-Day Surya Namaskar Challenge',
    level: 'Intermediate',
    duration: '30 Days',
    category: 'Contemporary Yoga',
    image: '/assets/suryanamaskarchallenge.png',
    description: 'Daily guided Sun Salutation practice with variations, philosophy, and personal transformation.'
  },
 
  {
    id: 'c12',
    title: 'Yoga for Better Sleep',
    level: 'All Levels',
    duration: '4 Weeks',
    category: 'Lifestyle Stress Management',
    image: '/assets/sleepyoga.png',
    description: 'Evening routines combining gentle yoga, Yoga Nidra, and breathing techniques for insomnia relief.'
  },
  {
    id: 'c14',
    title: 'Shatkarmas & Detox Intensive',
    level: 'Intermediate',
    duration: '7 Days Residential',
    category: 'Science of Pranayama & Meditation',
    image: '/assets/shatkarmaretreat.png',
    description: 'Traditional purification practices: Jala Neti, Nauli, Dhauti, Basti under expert guidance.'
  },
  {
    id: 'c17',
    title: 'Executive Yoga for Leadership & Focus',
    level: 'Intermediate',
    duration: '12 Weeks',
    category: 'Corporate Yoga & Work Life Balance',
    image: '/assets/executiveyoga.png',
    description: 'Premium program for managers and leaders: power pranayama, concentration techniques, emotional resilience training, and personalized coaching for peak performance and decision-making.'
},

  {
    id: 'c18',
    title: 'Breath & Restore: Corporate Reset Program',
    level: 'All Levels',
    duration: '6 Weeks',
    category: 'Corporate Yoga & Work Life Balance',
    image: '/assets/breathrestore.png',
    description: 'A science-backed lunchtime or end-of-day program combining 10-minute restorative yoga poses with powerful breathing techniques (Coherent Breathing, 4-7-8, Box Breathing) to instantly lower cortisol, calm the nervous system, and restore mental clarity—no mat or changing required.'
},
{
  id: 'c19',
  title: 'VIP & Elite Wellness Yoga',
  level: 'All Levels',
  duration: '60-90 min Per Session',
  category: 'Lifestyle Stress Management',
  image: '/assets/dailyrituals.png',
  description: 'The "VIP & Elite Wellness Yoga" course is a luxury, bespoke yoga program designed specifically for high-profile individuals such as celebrities, ultra high net worth individuals, politicians, and actors. The course offers personalized instruction aimed at enhancing physical vitality, emotional balance, and overall well-being in exclusive, private settings. Participants receive tools for maintaining optimal health tailored to their demanding lifestyles, promoting longevity, resilience, and inner peace.'
},
{
  id: 'c20',
  title: 'Burnout to Balance Blueprint',
  level: 'Intermediate',
  duration: '8 Weeks',
  category: 'Lifestyle Stress Management',
  image: '/assets/burnouttobalance.png',
  description: 'A step-by-step recovery program for high-achievers: identify stress triggers, rebuild energy with restorative yoga, master advanced pranayama (Nadi Shodhana + Bhramari), establish sattvic habits, and create lifelong boundaries for work-life harmony.'
}

];
export const PRACTICES: Practice[] = [
  // ASANA
  { id: 'p01', name: 'Hatha Yoga', category: 'Asana', description: 'The foundational physical branch of yoga using postures to purify body and mind.', benefits: ['Improved flexibility', 'Strengthened muscles', 'Better posture', 'Stress relief'], image: '/assets/hatha-yoga.png' },
  { id: 'p02', name: 'Vinyasa Flow', category: 'Asana', description: 'Dynamic sequences linking breath with movement in flowing transitions.', benefits: ['Cardiovascular health', 'Full-body strength', 'Mind-body coordination'], image: '/assets/vinyasa-flow.png' },
  { id: 'p03', name: 'Ashtanga Vinyasa', category: 'Asana', description: 'Rigorous set sequence with vinyasas and drishti points.', benefits: ['Discipline', 'Detoxification', 'Endurance'], image: '/assets/ashtanga-yoga.png' },
  { id: 'p04', name: 'Iyengar Yoga', category: 'Asana', description: 'Precision-focused practice using props for perfect alignment.', benefits: ['Therapeutic alignment', 'Injury recovery', 'Deep awareness'], image: '/assets/iyengar-yoga.png' },
  { id: 'p05', name: 'Yin Yoga', category: 'Asana', description: 'Long-held passive poses targeting connective tissues.', benefits: ['Joint health', 'Fascia release', 'Deep relaxation'], image: '/assets/yin-yoga.png' },
  { id: 'p06', name: 'Restorative Yoga', category: 'Asana', description: 'Fully supported poses held 10–20 minutes for nervous system reset.', benefits: ['Chronic stress relief', 'Insomnia treatment', 'Immune support'], image: '/assets/restorative-yoga.png' },
  { id: 'p07', name: 'Kundalini Yoga', category: 'Asana', description: 'Dynamic movements, kriyas, mantra and meditation to awaken energy.', benefits: ['Energy awakening', 'Glandular balance', 'Heightened awareness'], image: '/assets/kundalini-yoga.png' },
  { id: 'p39', name: 'Surya Namaskar', category: 'Asana', description: 'Sun Salutation – complete practice in itself.', benefits: ['Warms body', 'Prana flow', 'Daily ritual'], image: '/assets/surya-namaskar.png' },
  { id: 'p40', name: 'Chandra Namaskar', category: 'Asana', description: 'Moon Salutation – cooling and feminine sequence.', benefits: ['Emotional balance', 'Yin energy'], image: '/assets/chandra-namaskar.png' },

  // PRANAYAMA
  { id: 'p08', name: 'Nadi Shodhana', category: 'Pranayama', description: 'Alternate nostril breathing to balance ida and pingala.', benefits: ['Calms mind', 'Balances hemispheres', 'Reduces anxiety'], image: '/assets/nadi-shodhana.png' },
  { id: 'p09', name: 'Ujjayi Pranayama', category: 'Pranayama', description: 'Victorious breath with ocean-like sound.', benefits: ['Focus', 'Heat generation', 'Thyroid regulation'], image: '/assets/ujjayi-breath.png' },
  { id: 'p10', name: 'Kapalabhati', category: 'Pranayama', description: 'Skull-shining breath – rapid forceful exhalations.', benefits: ['Brain oxygenation', 'Digestive fire'], image: '/assets/kapalabhati.png' },
  { id: 'p11', name: 'Bhastrika', category: 'Pranayama', description: 'Bellows breath – powerful rapid breathing.', benefits: ['Energizing', 'Metabolism boost'], image: '/assets/bhastrika.png' },
  { id: 'p13', name: 'Sitali / Sitkari', category: 'Pranayama', description: 'Cooling breaths through tongue or teeth.', benefits: ['Cools body', 'Reduces anger'], image: '/assets/sitali-pranayama.png' },
  { id: 'p14', name: 'Bhramari', category: 'Pranayama', description: 'Humming bee breath with ears closed.', benefits: ['Instant calm', 'Releases emotions'], image: '/assets/bhramari.png' },
  { id: 'p44', name: 'Swara Yoga', category: 'Pranayama', description: 'Science of nasal dominance and lunar/solar cycles.', benefits: ['Optimal timing', 'Health prediction'], image: '/assets/swara-yoga.png' },

  // DHYANA (Meditation)
  { id: 'p15', name: 'Yoga Nidra', category: 'Dhyana', description: 'Guided yogic sleep – deepest relaxation state.', benefits: ['Trauma healing', '20 min = 4 hrs sleep'], image: '/assets/yoga-nidra.png' },
  { id: 'p16', name: 'Trataka', category: 'Dhyana', description: 'Candle gazing to develop concentration.', benefits: ['Memory', 'Third-eye activation'], image: '/assets/trataka.png' },
  { id: 'p17', name: 'Mantra Japa', category: 'Dhyana', description: 'Repetition of sacred sounds (Om, Gayatri, etc.).', benefits: ['Purifies mind', 'Induces samadhi'], image: '/assets/mantra-japa.png' },
  { id: 'p18', name: 'Vipassana', category: 'Dhyana', description: 'Insight meditation observing sensations.', benefits: ['Liberation from suffering'], image: '/assets/vipassana.png' },
  { id: 'p19', name: 'Mindfulness Meditation', category: 'Dhyana', description: 'Present-moment awareness practice.', benefits: ['Emotional regulation', 'Neuroplasticity'], image: '/assets/mindfulness.png' },
  { id: 'p20', name: 'Transcendental Meditation', category: 'Dhyana', description: 'Silent mantra meditation twice daily.', benefits: ['Deep rest', 'Creativity boost'], image: '/assets/tm-meditation.png' },
  { id: 'p21', name: 'Chakra Dhyana', category: 'Dhyana', description: 'Visualization of energy centers with bija mantras.', benefits: ['Energy balance', 'Spiritual awakening'], image: '/assets/chakra-dhyana.png' },
  { id: 'p45', name: 'Nada Yoga', category: 'Dhyana', description: 'Yoga of inner sound – listening to anahata nada.', benefits: ['Deep meditation', 'Cosmic connection'], image: '/assets/nada-yoga.png' },

  // KRIYA
  { id: 'p22', name: 'Neti (Jala & Sutra)', category: 'Kriya', description: 'Nasal cleansing with water or thread.', benefits: ['Sinus health', 'Allergy relief'], image: '/assets/neti-kriya.png' },
  { id: 'p23', name: 'Dhauti', category: 'Kriya', description: 'Digestive tract cleansing techniques.', benefits: ['Detoxification', 'Skin glow'], image: '/assets/dhauti.png' },
  { id: 'p24', name: 'Nauli', category: 'Kriya', description: 'Abdominal churning massage.', benefits: ['Strong digestion', 'Core strength'], image: '/assets/nauli.png' },
  { id: 'p25', name: 'Basti', category: 'Kriya', description: 'Yogic enema for colon cleansing.', benefits: ['Parasite removal', 'Vata balance'], image: '/assets/basti.png' },
  

  // CHIKITSA (Therapeutic)
  { id: 'p28', name: 'Yoga for Back Pain', category: 'Chikitsa', description: 'Targeted sequences for spinal health.', benefits: ['Pain relief', 'Improved mobility'], image: '/assets/back-pain-yoga.png' },
  { id: 'p29', name: 'Yoga for Anxiety & Depression', category: 'Chikitsa', description: 'Calming poses and breathing protocols.', benefits: ['Mood regulation', 'Emotional resilience'], image: '/assets/anxiety-yoga.png' },
  { id: 'p30', name: 'Yoga for Diabetes', category: 'Chikitsa', description: 'Stimulates pancreas and reduces insulin resistance.', benefits: ['Blood sugar control', 'Weight management'], image: '/assets/diabetes-yoga.png' },
  { id: 'p31', name: 'Yoga for Hypertension', category: 'Chikitsa', description: 'Cooling practices to lower blood pressure.', benefits: ['Vascular health', 'Heart protection'], image: '/assets/hypertension-yoga.png' },
  { id: 'p32', name: 'Yoga for PCOS & Hormonal Balance', category: 'Chikitsa', description: 'Specific asanas for reproductive health.', benefits: ['Regular cycles', 'Fertility support'], image: '/assets/pcos-yoga.png' },
  { id: 'p33', name: 'Prenatal Yoga', category: 'Chikitsa', description: 'Safe practice supporting mother and baby.', benefits: ['Easier labor', 'Emotional bonding'], image: '/assets/prenatal-yoga.png' },
  { id: 'p34', name: 'Senior Yoga', category: 'Chikitsa', description: 'Chair-based and gentle practice for elders.', benefits: ['Balance', 'Bone density', 'Cognitive health'], image: '/assets/senior-yoga.png' },
  { id: 'p35', name: 'Yoga for Insomnia', category: 'Chikitsa', description: 'Evening routine with forward bends.', benefits: ['Faster sleep onset', 'Deeper rest'], image: '/assets/insomnia-yoga.png' },
  { id: 'p43', name: 'Yogic Diet & Fasting', category: 'Chikitsa', description: 'Sattvic nutrition and therapeutic fasting.', benefits: ['Clarity', 'Longevity'], image: '/assets/yogic-diet.png' },

  // BANDHAS & MUDRAS
  { id: 'bm01', name: 'Mula Bandha', category: 'Bandhas & Mudras', description: 'Root lock – gentle contraction of the perineum to awaken muladhara chakra and redirect apana upward.', benefits: ['Kundalini awakening', 'Pelvic floor strength', 'Stability in asanas', 'Prevents energy leakage'], image: '/assets/mulabandha.png' },
  { id: 'bm02', name: 'Uddiyana Bandha', category: 'Bandhas & Mudras', description: 'Abdominal lock – drawing the navel toward the spine after full exhalation, creating a hollow belly.', benefits: ['Massages abdominal organs', 'Stimulates manipura chakra', 'Improves digestion', 'Strengthens diaphragm'], image: '/assets/uddiyanabandha.png' },
  { id: 'bm03', name: 'Jalandhara Bandha', category: 'Bandhas & Mudras', description: 'Throat lock – chin to chest, compressing carotid sinuses and balancing thyroid/parathyroid.', benefits: ['Regulates blood pressure', 'Calms mind', 'Activates vishuddha chakra', 'Supports breath retention'], image: '/assets/jalandharabandha.png' },
  { id: 'bm04', name: 'Maha Bandha', category: 'Bandhas & Mudras', description: 'The great lock – simultaneous application of all three bandhas during kumbhaka.', benefits: ['Intense prana concentration', 'Deep meditative states', 'Purification of nadis', 'Kundalini stimulation'], image: '/assets/mahabandha.png' },
  { id: 'bm05', name: 'Jnana Mudra', category: 'Bandhas & Mudras', description: 'Gesture of knowledge – thumb and index finger touch, palms up or down.', benefits: ['Enhances concentration', 'Stimulates pituitary', 'Calms mind', 'Connects individual and universal consciousness'], image: '/assets/jnanamudra.png' },
  { id: 'bm06', name: 'Chin Mudra', category: 'Bandhas & Mudras', description: 'Gesture of consciousness – identical hand position to jnana mudra but with energetic difference.', benefits: ['Receptivity', 'Openness to divine wisdom', 'Balances air element'], image: '/assets/chinmudra.png' },
  { id: 'bm07', name: 'Dhyana Mudra', category: 'Bandhas & Mudras', description: 'Meditation gesture – hands in lap, right over left, thumbs touching.', benefits: ['Deep stillness', 'Empties mind', 'Classic Buddha posture'], image: '/assets/dhyanamudra.png' },
  { id: 'bm08', name: 'Anjali Mudra', category: 'Bandhas & Mudras', description: 'Prayer gesture – palms pressed together at heart center (Namaste).', benefits: ['Balances hemispheres', 'Cultivates respect', 'Centers energy'], image: '/assets/anjalimudra.png' },
  { id: 'bm09', name: 'Varuna Mudra',category: 'Bandhas & Mudras', description: 'Water mudra – little finger touches thumb.', benefits: ['Hydration', 'Skin health', 'Reduces dryness and joint pain'], image: '/assets/varunamudra.png' },
  { id: 'bm10', name: 'Prana Mudra', category: 'Bandhas & Mudras', description: 'Life force mudra – ring and little fingers touch thumb.', benefits: ['Boosts vitality', 'Strengthens immunity', 'Improves eyesight'], image: '/assets/pranamudra.png' },
  { id: 'bm11', name: 'Apana Mudra', category: 'Bandhas & Mudras', description: 'Detoxification mudra – ring and middle fingers touch thumb.', benefits: ['Supports elimination', 'Relieves constipation', 'Menstrual comfort'], image: '/assets/apanamudra.png' },
  { id: 'bm12', name: 'Shuni Mudra', category: 'Bandhas & Mudras', description: 'Patience mudra – middle finger touches thumb.', benefits: ['Develops patience', 'Strengthens intuition', 'Supports discipline'], image: '/assets/shunimudra.png' },
  { id: 'bm13', name: 'Surya Mudra', category: 'Bandhas & Mudras', description: 'Sun/fire mudra – ring finger folded, thumb presses it.', benefits: ['Increases metabolism', 'Weight management', 'Warms cold body'], image: '/assets/suryamudra.png' },
  { id: 'bm14', name: 'Linga Mudra', category: 'Bandhas & Mudras', description: 'Heat-generating mudra – fingers interlaced, left thumb upright.', benefits: ['Generates internal heat', 'Cold/flu relief', 'Boosts immunity'], image: '/assets/lingamudra.png' },
  { id: 'bm15', name: 'Yoni Mudra', category: 'Bandhas & Mudras', description: 'Womb gesture – hands form downward triangle over lower abdomen.', benefits: ['Feminine energy activation', 'Emotional healing', 'Reproductive health'], image: '/assets/yonimudra.png' },

  
  // VISHRANTI (Deep Rest)
  { id: 'p36', name: 'Shavasana', category: 'Vishranti', description: 'Corpse pose – complete surrender.', benefits: ['Parasympathetic activation'], image: '/assets/shavasana.png' },
  { id: 'p37', name: 'Makarasana', category: 'Vishranti', description: 'Crocodile pose for diaphragm release.', benefits: ['Anxiety relief'], image: '/assets/makarasana.png' },
  { id: 'p38', name: 'Balasana', category: 'Vishranti', description: 'Child’s pose for deep comfort.', benefits: ['Hip opening', 'Soothing'], image: '/assets/balasana.png' },
];
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ruth Mueller",
    role: "Yoga Student",
    text: "Training under Gopinath Acharya has been a transformative journey for both my body and mind. His teachings go far beyond the physical practice of asanas; he instills a deep understanding of breath, awareness, and inner stillness. Through his guidance, I have experienced a profound sense of balance, clarity, and harmony in my daily life. Gopinath Acharya’s wisdom as a yogi is unmatched, and his presence radiates calm, compassion, and inspiration. I am eternally grateful for his mentorship and the light he has brought into my practice.",
    image: "https://picsum.photos/seed/person1/100/100"
  },
  {
    id: 2,
    name: "Shital Shah",
    role: "Therapy Student",
    text: "Gopinath Acharya is not just a teacher, but a true embodiment of yoga itself. His sessions are a sanctuary where the mind quiets, the body strengthens, and the soul awakens. Each instruction is delivered with precision, humility, and a depth of understanding that touches the heart. Under his guidance, I have learned to move with grace, breathe with intention, and live with mindfulness. I am profoundly thankful to Gopinath Acharya for opening the door to the deeper dimensions of yoga and guiding me toward inner peace.",
    image: "https://picsum.photos/seed/person2/100/100"
  },
  {
    id: 3,
    name: "Alex Musava",
    role: "Yoga Practitioner",
    text: "As a yoga practitioner myself, I’ve had the privilege of practicing alongside Gopinath Acharya, and I can honestly say he is a rare gem in the world of yoga. Beyond his mastery of asanas and pranayama, his humility, patience, and deep understanding of the philosophy behind yoga set him apart. Training with him feels like a journey inward, guided by someone who truly embodies the harmony he teaches. I’m grateful not only for his guidance on the mat but also for his friendship, which continues to inspire me to grow as a yogi every day",
    image: "https://picsum.photos/seed/person2/100/100"
  }
];

export const BLOG: Blog[] = [
{
  id: 'e01',
  title: 'Get-Away Yoga Retreats',
  level: 'All Levels',
  category: 'Yogic Events',
  image: '/assets/retreats.png',
  description: 'Deeply immersive retreats designed for rest, healing, spiritual replenishment, and yogic rejuvenation in serene natural locations.'
},
{
  id: 'e02',
  title: 'Yoga Conferences & Seminars',
  level: 'All Levels',
  category: 'Yogic Events',
  image: '/assets/conference.png',
  description: 'Workshops and seminars featuring yoga masters sharing ancient wisdom, research insights, and transformative practices.'
},
{
  id: 'e03',
  title: 'Yoga Programs for Special Groups',
  level: 'All Levels',
  category: 'Yogic Events',
  image: '/assets/specialneeds.png',
  description: 'Inclusive programs designed for people with disabilities, correctional facilities, universities, NGOs, and therapeutic communities.'
},
{
  id: 'e04',
  title: 'Yoga Philosophy Discussions',
  level: 'All Levels',
  category: 'Yogic Events',
  image: '/assets/yogasutras.png',
  description: 'Talks on Patanjali Yoga Sutras, all aspects of Yoga Philosophy and Psychology.'
},
{
  id: 'e05',
  title: 'Devotional Sessions',
  level: 'All Levels',
  category: 'Yogic Events',
  image: '/assets/devotion.png',
  description: 'Singing Bhajans and Kirtans as a part of Nada Yoga Meditation'
}, 
{
  id: 'e06',
  title: 'Yoga Seva Sessions',
  level: 'All Levels',
  category: 'Yogic Events',
  image: '/assets/seva.png',
  description: 'Charity sessions for Community and Social Wellbeing'
}
]