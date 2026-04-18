import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, MapPin, CheckCircle, AlertCircle, ChevronRight, Phone, User, BarChart3, HelpCircle, Mail, Share2, Instagram, Twitter } from 'lucide-react';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from './lib/utils';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    usePublicCharging: '',
    biggestIssue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track page visit
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await addDoc(collection(db, 'analytics_visits'), {
          path: window.location.pathname,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent
        });
      } catch (err) {
        console.error('Visit tracking failed:', err);
      }
    };
    trackVisit();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.usePublicCharging || !formData.biggestIssue) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'waitlist'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,0.15),transparent_50%)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl text-center space-y-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 relative">
              <CheckCircle className="w-12 h-12 text-emerald-400 z-10" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-emerald-500/20" 
              />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-white leading-tight">Welcome to the future!</h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                You're officially on the early access list. We'll reach out via email as soon as we're ready to power up Warangal.
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Help us grow</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => alert('Share functionality would go here!')}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 transition-all"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 transition-all">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="flex-1 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 transition-all">
                    <Instagram className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-lg mx-auto py-12 px-6">
        {/* Logo/Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-12"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">VoltWarangal</span>
        </motion.div>

        {/* Hero Section */}
        <header className="mb-12 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Struggling to find a <span className="text-emerald-400">working</span> EV charger?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            We’re building a solution for EV users in Warangal.
          </motion.p>
        </header>

        {/* Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <User className="w-3 h-3" /> Name <span className="text-[10px] lowercase italic">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-emerald-500" /> Email Address <span className="text-red-500 mr-auto text-xs font-bold font-mono">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number <span className="text-[10px] lowercase italic">(Alternative)</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6 pt-2">
              <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <BarChart3 className="w-3 h-3" /> Do you use public charging? <span className="text-red-500 mr-auto text-xs font-bold font-mono">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {['Yes', 'Sometimes', 'Never'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange('usePublicCharging', option)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200",
                        formData.usePublicCharging === option 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium" 
                          : "bg-slate-800/30 border-slate-800 hover:border-slate-700 text-slate-400"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <HelpCircle className="w-3 h-3" /> Biggest issue with charging? <span className="text-red-500 mr-auto text-xs font-bold font-mono">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {['Charger not working', 'Busy', 'Hard to find', 'Don’t use'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange('biggestIssue', option)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm",
                        formData.biggestIssue === option 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium" 
                          : "bg-slate-800/30 border-slate-800 hover:border-slate-700 text-slate-400"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-3 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Join Early Access
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-600 text-sm space-y-4">
          <p>© 2026 VoltWarangal. Leading the EV revolution in Warangal.</p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-widest">
            <span className="text-emerald-500/50 animate-pulse">● Live Tracking</span>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <span>Secure Database</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
