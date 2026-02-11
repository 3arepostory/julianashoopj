
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrderFlow } from './components/OrderFlow';
import { Chat } from './components/Chat';
import { AdminPanel } from './components/AdminPanel';
// Removed non-existent User type from imports
import { Emotion } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'order-flow'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentProtocol, setCurrentProtocol] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('juliana-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('juliana-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const startOrderFlow = () => setView('order-flow');
  const backToHome = () => setView('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'home' ? (
          <Hero 
            onStartOrder={startOrderFlow}
            onOpenChat={() => setIsChatOpen(true)}
          />
        ) : (
          <OrderFlow 
            onCancel={backToHome} 
            onFinish={(protocol) => {
              setCurrentProtocol(protocol);
              setView('home');
              setIsChatOpen(true);
            }}
          />
        )}
      </main>

      <Chat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        protocolId={currentProtocol}
      />

      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      <footer className="py-8 text-center text-gray-500 text-sm">
        &copy; 2024 Juliana Multishop. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
