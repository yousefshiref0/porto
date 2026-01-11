import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { Services } from './landing/Services';
import { Portfolio } from './landing/Portfolio';
import { ValueProps } from './landing/ValueProps';
import { TechStack } from './landing/TechStack';
import { Contact } from './landing/Contact';
import { Footer } from './landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <ValueProps />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}
