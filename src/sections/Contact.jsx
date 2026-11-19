import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SceneCanvas from '../components/3d/SceneCanvas';
import { Send, Clock, ShieldCheck } from 'lucide-react';

const ContactScene = lazy(() => import('../components/3d/ContactScene'));

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Form (UNCHANGED content) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] backdrop-blur-xl relative"
          >
            <div className="absolute top-0 left-10 w-20 h-[2px] bg-brand-blue" />
            
            <h2 className="text-4xl font-black mb-2">Direct Sales <span className="text-brand-blue">Inquiry</span></h2>
            <p className="text-gray-500 mb-10 text-sm">Real-time quote tracking & immediate dispatch support.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Company Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-brand-blue transition-all" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Contact Phone</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-brand-blue transition-all" placeholder="+91" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Requirements</label>
                <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-brand-blue transition-all" placeholder="Tell us about the chemicals and quantity needed..."></textarea>
              </div>

              <button className="w-full py-4 rounded-2xl bg-brand-blue text-brand-dark font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] transition-all flex items-center justify-center gap-3 group">
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Submit for Instant Quote
              </button>
            </form>
          </motion.div>

          {/* Right Side: Interactive 3D (UPGRADE) */}
          <div className="relative h-[600px] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-full h-full"
            >
              <SceneCanvas>
                <ContactScene />
              </SceneCanvas>
            </motion.div>

            {/* Performance/Trust Stats Overlay */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-10 flex flex-col gap-6">
              {[
                { icon: <Clock className="text-brand-blue" />, value: "30min", label: "Avg Quote Time" },
                { icon: <ShieldCheck className="text-green-500" />, value: "100%", label: "QC Passed" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="p-6 bg-brand-dark/80 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-1">
                    {stat.icon}
                    <span className="text-2xl font-black text-white tracking-tighter">{stat.value}</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
