import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Chatbot from './components/ui/Chatbot';

// Sections
import Hero from './sections/Hero';
import Contact from './sections/Contact';

// Note: Port other sections (About, Products, etc.) if needed, 
// but for this task we focus on Hero, Chatbot, and Contact.

function App() {
  return (
    <div className="bg-brand-dark text-white min-h-screen selection:bg-brand-blue/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Placeholder for other sections to maintain structure */}
        <div className="py-20 text-center opacity-20 text-xs uppercase tracking-[1em]">
          Industrial Experience • Excellence • Expertise
        </div>
        
        <Contact />
      </main>

      <Chatbot />
      
      <footer className="py-12 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-widest">
        © {new Date().getFullYear()} Pavni Chemicals. Authorized Grasim Industries Partner.
      </footer>
    </div>
  );
}

export default App;
