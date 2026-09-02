import { useState, useEffect } from 'react'
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './App.css'
import Card from './Componant/Card.tsx'
import LessonDetails from './Componant/LessonDetails.tsx'
import CreateLesson from './Componant/CreateLesson.tsx'
import Navbar from './Componant/Navbar.tsx'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Theme state
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

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

  const handleCreateLessonRoute = () => {
    navigate('/create-lesson');
  };

  const handleBack = () => {
    navigate('/');
  };

  const isLessonRoute = currentPath.startsWith('/lesson/');
  const selectedLessonId = isLessonRoute ? parseInt(currentPath.split('/')[2], 10) : null;
  const isCreateLessonRoute = currentPath === '/create-lesson';

  if (isLessonRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors duration-300">
        <main className="w-full max-w-7xl">
          <LessonDetails id={selectedLessonId} onBack={handleBack} />
        </main>
      </div>
    );
  }

  if (isCreateLessonRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors duration-300">
        <main className="w-full max-w-7xl">
          <button onClick={handleBack} className="mb-4 text-indigo-400 hover:text-indigo-300">
            &larr; Back to Home
          </button>
          <CreateLesson />
        </main>
      </div>
    );
  }
  useEffect(() => {


    createChat({
      webhookUrl: 'https://mamdouhwael.app.n8n.cloud/webhook/2d6247b8-c4ab-426b-94a8-23b125c4477c/chat',
      // metadata: {
      //   // apiKey: apiKey
      // }
    });
  }, []);

  return (
    <>
      <Navbar onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors duration-300">
        <header className="mb-12 text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            KBM Lessons
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Master new technologies and grow your career with interactive programming resources.
          </p>
        </header>

        <main className="w-full max-w-7xl">
          <Card onEnroll={handleEnroll} onCreateLesson={handleCreateLessonRoute} />
          {/*<Chatbot />*/}

        </main>
      </div>
    </>
  )
}

export default App
