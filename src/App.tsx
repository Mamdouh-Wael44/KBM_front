import { useState, useEffect } from 'react'
import './App.css'
import Card from './Componant/Card.tsx'
import LessonDetails from './Componant/LessonDetails.tsx'
import Chatbot from './Componant/Chatbot.tsx'
import Departments from './Componant/Departments.tsx'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const handleEnroll = (id: number) => {
    navigate(`/lesson/${id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const isLessonRoute = currentPath.startsWith('/lesson/');
  const selectedLessonId = isLessonRoute ? parseInt(currentPath.split('/')[2], 10) : null;

  if (isLessonRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <main className="w-full max-w-7xl">
          <LessonDetails id={selectedLessonId} onBack={handleBack} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <header className="mb-12 text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          KBM Lessons
        </h1>
        <p className="mt-4 text-slate-405 text-slate-400 text-lg">
          Master new technologies and grow your career with interactive programming resources.
        </p>
      </header>
      
      <main className="w-full max-w-7xl">
        <Card onEnroll={handleEnroll} />
        <Departments />
        <Chatbot />
      </main>
    </div>
  )
}

export default App
