import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-black text-brand-dark text-xl">P</div>
          <span className="text-xl font-black tracking-tight text-white uppercase">Pavni Chemicals</span>
        </div>
        
        <div className="hidden lg:flex gap-10">
          {["Home", "Products", "Industries", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold text-gray-400 hover:text-brand-blue uppercase tracking-[0.3em] transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
