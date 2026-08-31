import { useState, useRef, useEffect } from 'react'
import lessonsData from './Data'
import CreateLesson from './CreateLesson'

const categories = ["All", "Development", "Design", "Data Science", "Backend", "Frontend", "Fullstack", "ui/ux", "Next.js", "DevOps"];

interface Lesson {
  id: number;
  img: string;
  title: string;
  rate: number;
  description: string;
  category?: string;
  instructor?: string;
}

interface CardProps {
  onEnroll?: (id: number) => void;
  onCreateLesson?: () => void;
}

const Card = ({ onEnroll, onCreateLesson }: CardProps) => {
  // Map baseline categories and instructors for extra visual detail
  const baseLessons: Lesson[] = lessonsData.map((lesson, idx) => ({
    ...lesson,
    category: categories[idx % categories.length],
    instructor: ["Sarah Jenkins", "Alex Rivera", "David Chen", "Emily Taylor"][idx % 4]
  }));

  // Threshold config: Carousel mode triggers if number of items is greater than 6
  const CAROUSEL_LIMIT = 6;
  const useCarousel = baseLessons.length > CAROUSEL_LIMIT;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Checking scroll status for navigation disabled states
  const updateScrollButtonsStatus = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollWidth - scrollLeft - clientWidth > 5);
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateScrollButtonsStatus, 150);
    window.addEventListener('resize', updateScrollButtonsStatus);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollButtonsStatus);
    };
  }, []);

  const handleCreateLesson = () => {
    if (onCreateLesson) {
      onCreateLesson();
    }
  };

  // Smooth scroll handler
  const handleScrollClick = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollStep = 350;
      const scrollAmount = direction === 'left' ? -scrollStep : scrollStep;
      
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  const [activeCategory, setActiveCategory] = useState<string>("All");

   const filteredLessons = activeCategory === "All" 
    ? baseLessons 
    : baseLessons.filter(l => l.category === activeCategory);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveCategory(e.target.value);
  };

  return (
    <div className="w-full select-none">
      
      {/* Main Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Latest Lessons</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Upgrade your coding capability with expert tutorials.</p>
        </div>
        
        {/* Render navigation buttons only for Carousel mode */}
        {useCarousel && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleScrollClick('left')}
              disabled={!canScrollLeft}
              className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={() => handleScrollClick('right')}
              disabled={!canScrollRight}
              className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button onClick={handleCreateLesson} className="p-2 flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
              Create Lesson
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>

            <select value={activeCategory} onChange={handleCategoryChange}   className="p-2 flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="ui/ux">ui/ux</option>
              <option value="Next.js">Next.js</option>
              <option value="DevOps">DevOps</option> 
              <option value="Design">Design</option>
            </select>
          </div>
        )}
        
      </div>


      {/* Render Component Body */}
      {useCarousel ? (
        /* ================= CAROUSEL LAYOUT ================= */
        <div className="relative w-full">
          <div 
            ref={containerRef}
            onScroll={updateScrollButtonsStatus}
            className="flex overflow-x-auto gap-6 pb-6 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
          >
            {filteredLessons.map((lesson) => (
              <div 
                key={lesson.id} 
                className="snap-start shrink-0 w-[290px] sm:w-[325px]"
              >
                <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)] transition-all duration-300 flex flex-col group">
                  {/* Image portion */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-950">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={lesson.img} 
                      alt={lesson.title} 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-slate-950/80 via-transparent to-transparent opacity-80"></div>
                    {lesson.category && (
                      <span className="absolute top-4 left-4 bg-indigo-500/85 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {lesson.category}
                      </span>
                    )}
                  </div>

                  {/* Body content */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-205 line-clamp-1">
                        {lesson.title}
                      </h2>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">By {lesson.instructor}</span>
                        <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs bg-amber-500/10 dark:bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20 dark:border-amber-500/10">
                          <span>{lesson.rate}</span>
                          <span className="text-[10px]">&#9733;</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed h-8">
                        {lesson.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800/60">
                      {/* <span className="text-xs text-slate-500 font-medium font-mono">ID: {lesson.id}</span> */}
                      <button 
                        onClick={() => onEnroll?.(lesson.id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg cursor-pointer transform active:scale-95 transition-all shadow-md shadow-indigo-900/10 hover:shadow-indigo-600/20"
                      >
                        Enroll Now &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= GRID LAYOUT ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {baseLessons.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)] transition-all duration-300 flex flex-col group"
            >
              {/* Image portion */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-950">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={lesson.img} 
                  alt={lesson.title} 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-slate-950/80 via-transparent to-transparent opacity-80"></div>
                {lesson.category && (
                  <span className="absolute top-4 left-4 bg-indigo-500/85 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {lesson.category}
                  </span>
                )}
              </div>

              {/* Body content */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-205 line-clamp-1">
                    {lesson.title}
                  </h2>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">By {lesson.instructor}</span>
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs bg-amber-500/10 dark:bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20 dark:border-amber-500/10">
                      <span>{lesson.rate}</span>
                      <span className="text-[10px]">&#9733;</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed h-8">
                    {lesson.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800/60">
                  <span className="text-xs text-slate-500 font-medium font-mono">ID: {lesson.id}</span>
                  <button 
                    onClick={() => onEnroll?.(lesson.id)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold rounded-lg cursor-pointer transform active:scale-95 transition-all shadow-md shadow-indigo-900/10 hover:shadow-indigo-600/20"
                  >
                    Enroll Now &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Card