import { useState, useEffect } from 'react'
import lessonsData from './Data'
import type { Lesson } from './Data'

interface LessonDetailsProps {
  id: number | null;
  onBack: () => void;
}

// Custom structure for detailed lessons details (Curriculum, FAQ, etc.)
interface DetailedInfo {
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lectures: string[];
  skills: string[];
  hours: number;
}

const DETAILS_MAP: Record<number, DetailedInfo> = {
  1: {
    duration: "6 Weeks",
    level: "Beginner",
    lectures: [
      "Introduction to Client-Server Architectures",
      "Semantic HTML5 Page Structure",
      "CSS3 Elements, Flexbox, and Modern Grid Layouts",
      "CSS Variable Tokens & Custom Themes",
      "JavaScript Basics & Primitive Types",
      "Working with DOM API & Event Listeners"
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    hours: 24
  },
  2: {
    duration: "8 Weeks",
    level: "Intermediate",
    lectures: [
      "React Virtues, Virtual DOM & JSX Basics",
      "Component States, Props, and Lifecycle Hooks",
      "Handling Form States and Validation Reactively",
      "Deep Dive in useEffect & Cleanups",
      "Context API & State Management",
      "Building Custom Compound Components"
    ],
    skills: ["React", "JSX", "TypeScript", "Modern State Flow"],
    hours: 32
  },
  3: {
    duration: "5 Weeks",
    level: "Advanced",
    lectures: [
      "ES6+ Variables, Scope & Hoisting",
      "Closures, Currying, and High-Order Functions",
      "Asynchronous JS: Event Loop & Task queues",
      "Promises, Generator functions, and Async/Await",
      "Prototyping & Object-Oriented JS",
      "Performance optimization & Memory profiling"
    ],
    skills: ["ES6+", "Async Programming", "Design Patterns", "Performance"],
    hours: 20
  },
  4: {
    duration: "6 Weeks",
    level: "Beginner",
    lectures: [
      "Python Setup, Interactive CLI and Interpreters",
      "Variables, Data Structs (Lists, Dicts, Sets)",
      "Control Flows, Loops & List Comprehension",
      "Defining Modules & Importing libraries",
      "Object-Oriented Programming (Classes & Inheritance)",
      "Writing Tests & Exception Handling"
    ],
    skills: ["Python 3", "Data Structures", "OOP Basics", "File Handling"],
    hours: 28
  },
  5: {
    duration: "4 Weeks",
    level: "Beginner",
    lectures: [
      "What is UX? Understanding the User Lifecycle",
      "Typography Scale, Color Theory, and Contrast ratios",
      "Wireframe Structures & High-Fidelity Mockups in Figma",
      "Component states, Design Systems & Auto-layouts",
      "Interactive Prototyping and User Testing",
      "Handoff strategies for developers"
    ],
    skills: ["Figma", "Wireframing", "Color Harmony", "Prototyping"],
    hours: 16
  },
  6: {
    duration: "10 Weeks",
    level: "Advanced",
    lectures: [
      "Intro to AI & Probability Foundations",
      "Supervised vs Unsupervised Learning",
      "Regression Models (Linear & Logistic)",
      "Decision Trees & Random Forests",
      "Neural Networks and Deep Learning Intro",
      "Model deployment and API creation"
    ],
    skills: ["Python", "TensorFlow", "Scikit-Learn", "Statistics"],
    hours: 45
  },
  7: {
    duration: "7 Weeks",
    level: "Intermediate",
    lectures: [
      "Intro to DevOps philosophies",
      "Understanding Local Virtualization",
      "Building Custom Dockerimages & Containers",
      "Docker Compose multi-container workflows",
      "GitHub Actions & Continuous Integration",
      "Intro to AWS Deployment"
    ],
    skills: ["Docker", "CI/CD", "Linux bash", "AWS Cloud"],
    hours: 30
  },
  8: {
    duration: "9 Weeks",
    level: "Advanced",
    lectures: [
      "React Frameworks foundations",
      "File-system Routing in Next.js v15",
      "Server Components (RSC) vs Client Components",
      "Data Fetching, Caching and Server Actions",
      "Middleware routing & ISR strategies",
      "Deploying to Vercel networks"
    ],
    skills: ["Next.js", "React Server Components", "Deployment", "Vercel"],
    hours: 40
  }
};

const LessonDetails = ({ id, onBack }: LessonDetailsProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');
  const [enrolled, setEnrolled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Retrieve basic info
  const lesson: Lesson | undefined = lessonsData.find(l => l.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!lesson) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Lesson Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">The course details page you're trying to visit doesn't exist.</p>
        <button 
          onClick={onBack}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition duration-200 cursor-pointer shadow-lg hover:shadow-indigo-500/20"
        >
          &larr; Back to Lessons
        </button>
      </div>
    );
  }

  // Retrieve specific meta info or use fallback
  const fallbackDetails: DetailedInfo = {
    duration: "5 Weeks",
    level: "Intermediate",
    lectures: ["Introduction to Topic", "Hands-on Coding", "Building Projects", "Advanced Methods", "Final Exam & Certificate"],
    skills: ["General Coding", "Problem Solving", "Software Architecture"],
    hours: 20
  };
  
  const details = DETAILS_MAP[lesson.id] || fallbackDetails;
  
  // Re-derive category & instructor based on base mapping logic
  const category = lesson.id % 3 === 0 ? "Development" : lesson.id % 3 === 1 ? "Design" : "Data Science";
  const instructor = ["Sarah Jenkins", "Alex Rivera", "David Chen", "Emily Taylor"][lesson.id % 4];
  const instructorBio = `${instructor} is a seasoned computer scientist who has over 8 years of production level software design expertise. They focus on delivering bite-sized, practical knowledge that assists developers in accelerating their career progression.`;

  const handleEnrollClick = () => {
    setEnrolled(true);
    setShowAnimation(true);
    // Dismiss popup animation in 4 seconds
    setTimeout(() => {
      setShowAnimation(false);
    }, 4500);
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Back Link Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:border-slate-700 cursor-pointer"
      >
        <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span>Back to Lessons</span>
      </button>

      {/* Success Notification Banner */}
      {showAnimation && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-500/30 text-white rounded-2xl p-5 shadow-2x1 flex items-start gap-4 animate-bounce">
          <span className="p-2.5 bg-white/10 rounded-xl text-xl">&#127881;</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base">Enrollment Confirmed!</h3>
            <p className="text-xs text-slate-205 text-emerald-105 mt-0.5">
              Congratulations, you have registered for <strong>{lesson.title}</strong>. Check your dashboard for curriculum updates.
            </p>
          </div>
        </div>
      )}

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side Layout (Text description, Curriculum timeline, Tabs) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Info Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl transition-colors duration-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {category}
              </span>
              <span className="bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                Difficulty: {details.level}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              {lesson.title}
            </h1>

            <div className="flex items-center gap-6 flex-wrap text-sm text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 dark:text-amber-400 text-lg">&#9733;</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{lesson.rate} rating</span>
                <span className="text-slate-500">(148 reviews)</span>
              </div>
              <div className="text-slate-300 dark:text-slate-700">|</div>
              <div>
                Instructor: <strong className="text-slate-800 dark:text-slate-200">{instructor}</strong>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-colors duration-300">
            <div className="flex border-b border-slate-200 dark:border-slate-850 flex-wrap">
              {(['overview', 'curriculum', 'instructor'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 min-w-[100px] text-center py-4 text-sm font-semibold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-indigo-50/50 dark:bg-slate-850/80 border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850/20'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Course Description</h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                      {lesson.description} This comprehensive guide provides everything you need to start building and mastering software projects. Designed by industry experts, it covers fundamental paradigms, real-world development setups, and step-by-step practical guides. You'll complete hands-on assignments and construct a robust portfolio project.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Skills Acquired</h3>
                    <div className="flex flex-wrap gap-2">
                      {details.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Curriculum Timeline */}
              {activeTab === 'curriculum' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Modules Breakdown</h3>
                  <div className="space-y-4">
                    {details.lectures.map((lecture, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/20 group hover:border-slate-300 dark:hover:border-slate-800 transition-colors">
                        <span className="font-mono text-slate-400 dark:text-zinc-500 text-sm font-bold pt-0.5">0{index + 1}</span>
                        <div className="flex-grow">
                          <h4 className="font-bold text-slate-800 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-slate-100 transition-colors text-sm sm:text-base">{lecture}</h4>
                          <span className="text-xs text-slate-500 mt-1 block">Lecture Block &bull; Required reading</span>
                        </div>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-500/10 px-2.5 py-1 rounded-lg">
                          Week {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Instructor Information */}
              {activeTab === 'instructor' && (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-200 dark:bg-slate-805 border border-slate-300 dark:border-slate-700/60 overflow-hidden shrink-0">
                    <img 
                      className="w-full h-full object-cover" 
                      src={`https://images.unsplash.com/photo-${lesson.id % 2 === 0 ? '1534528741775-53994a69daeb' : '1507003211169-0a1dd7228f2d'}?auto=format&fit=crop&w=150&q=80`} 
                      alt={instructor} 
                    />
                  </div>
                  <div className="space-y-3 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200">{instructor}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">Lead Learning Advisor & Instructor</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                      {instructorBio}
                    </p>
                    <div className="flex gap-6 justify-center sm:justify-start text-xs text-slate-500 pt-2 font-mono">
                      <div>Students: <span className="font-bold text-slate-800 dark:text-slate-400">12k+</span></div>
                      <div>Courses: <span className="font-bold text-slate-800 dark:text-slate-400">5</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Layout (Sticky details card & CTA) */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl sticky top-8 hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-300">
            
            {/* Featured Image */}
            <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-950">
              <img className="w-full h-full object-cover" src={lesson.img} alt={lesson.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-slate-950 via-transparent to-transparent"></div>
              <span className="absolute bottom-4 right-4 bg-emerald-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-sm shadow-md">
                AVAILABLE NOW
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800/40 text-center">
                  <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Duration</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-1 block">{details.duration}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800/40 text-center">
                  <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Total Time</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-1 block">{details.hours} Hours</span>
                </div>
              </div>

              {/* Course Features list */}
              <div className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-base">&#10003;</span>
                  <span>Self-paced learning model</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-base">&#10003;</span>
                  <span>Direct Instructor Support channels</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-base">&#10003;</span>
                  <span>Access on Mobile and Desktop</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-base">&#10003;</span>
                  <span>Certificate of Completion awarded</span>
                </div>
              </div>

              {/* Call To Action Buttons */}
              <div className="pt-2">
                {enrolled ? (
                  <button 
                    disabled 
                    className="w-full py-3.5 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 font-extrabold rounded-xl text-center text-sm shadow-inner cursor-not-allowed"
                  >
                    You Are Enrolled &#10003;
                  </button>
                ) : (
                  <button 
                    onClick={handleEnrollClick}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white font-extrabold rounded-xl text-center text-sm cursor-pointer shadow-lg shadow-indigo-900/10 active:scale-98 hover:shadow-indigo-600/25 transition-all duration-200"
                  >
                    Confirm Enroll &rarr;
                  </button>
                )}
                
                <p className="text-[10px] text-slate-500 text-center mt-3">
                  Instant free access. Cancel registrations at any time.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LessonDetails;
