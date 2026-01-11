import { useEffect } from 'react';
import { LandingPage } from './components/LandingPage';

export default function App() {
  // Force dark mode for the landing page theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return <LandingPage />;
}
