import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SceneCanvas from '../components/3d/SceneCanvas';
import { FileText, Download } from 'lucide-react';

const HeroScene = lazy(() => import('../components/3d/HeroScene'));

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content (MAINTAINED EXACTLY) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            Authorized Dealer — Grasim Industries Limited
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            Advanced <br />
            <span className="text-brand-blue">Chemical</span> <br />
            Distribution
          </h1>
          
          <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            Authorized distributor for Grasim Industries Limited (Aditya Birla Group). 
            Delivering high-purity industrial chemicals with a precision-controlled 
            logistics network across Gujarat.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-2xl bg-brand-blue text-brand-dark font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all">
              Request Quotes
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-2">
              <Download size={18} />
              Product List
            </button>
          </div>
        </motion.div>

        {/* Right Side: 3D Canvas (FIXED AREA) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[500px] lg:h-[700px] w-full hidden md:block"
        >
          <div className="absolute inset-0 bg-brand-blue/5 rounded-[40px] blur-3xl" />
          <SceneCanvas>
            <HeroScene />
          </SceneCanvas>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
};

export default Hero;
