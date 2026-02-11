
import React from 'react';
import { Button } from './ui/neon-button';
import { Card } from "./ui/card"
import { Spotlight } from "./ui/spotlight"
import { motion } from "framer-motion";

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] flex flex-col overflow-x-hidden relative scroll-smooth selection:bg-indigo-500/30">
      {/* Navbar - Fixed Spacing */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-12 md:py-5">
        <div className="max-w-7xl mx-auto glass border border-white/5 rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
              <i className="fas fa-fingerprint text-black text-lg"></i>
            </div>
            <span className="text-xl font-extrabold tracking-tighter uppercase hidden sm:block">Safe Inbox</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#simulator" className="hover:text-white transition-colors">Sandbox</a>
            <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="solid" size="sm" onClick={onEnter} className="bg-white text-black hover:bg-white/90 border-transparent px-8 py-2.5 font-bold uppercase tracking-widest">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 md:px-10 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-7xl mx-auto py-24 md:py-32 bg-black/[0.96] relative overflow-hidden border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-[3rem]">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-10 inline-block">
                 Version 4.0
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-10 uppercase">
                STOP EMAIL<br />
                <span className="italic">SCAMS</span>
              </h1>
              <p className="text-gray-400 text-base md:text-2xl font-medium max-w-2xl mb-14 leading-relaxed">
                An AI-powered system that checks emails and tells you if they are safe, spam, or risky.
                It analyzes language, links, and sender details to detect threats in real time.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                 <Button variant="solid" size="lg" className="bg-white text-black hover:bg-gray-200 border-transparent px-16 py-8 font-black uppercase tracking-widest text-sm" onClick={onEnter}>
                    Start Scan
                 </Button>
                 <Button variant="ghost" size="lg" className="border-white/10 text-white px-16 py-8 font-black uppercase tracking-widest text-sm" onClick={onEnter}>
                    View System
                 </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[120%] h-96 bg-indigo-500/10 blur-[120px] rounded-[100%] pointer-events-none"></div>
        </Card>
      </section>

      {/* Architecture Section */}
      <section id="logic" className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Architecture</h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tight mb-8">Smart Email Protection.</h3>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg md:text-xl leading-relaxed">
            Safe Inbox does not rely on simple keyword rules. 
            It reads the email like a human and understands the intent behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="Language Check"
            score="98%"
            desc="Detects fake urgency and suspicious wording."
            icon="fa-comments-dollar"
          />
          <FeatureCard 
            title="Link & Domain Check"
            score="99%"
            desc="Finds mismatched or suspicious website links."
            icon="fa-shield-halved"
          />
          <FeatureCard 
            title="Intent Analysis"
            score="95%"
            desc="Understands why the sender is asking for something."
            icon="fa-brain"
          />
          <FeatureCard 
            title="Impersonation Detection"
            score="97%"
            desc="Checks if someone is pretending to be a trusted company."
            icon="fa-user-secret"
          />
        </div>
      </section>

      {/* Sandbox */}
      <section id="simulator" className="relative z-10 py-40 px-6 max-w-7xl mx-auto w-full">
         <div className="glass-card p-12 md:p-32 rounded-[4rem] flex flex-col items-center text-center overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[40%] bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-white mb-12 shadow-2xl border border-white/10">
              <i className="fas fa-flask-vial text-3xl"></i>
            </div>
            <h3 className="text-4xl md:text-7xl font-black tracking-tight mb-8 uppercase italic">What-If Sandbox.</h3>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium text-xl md:text-2xl leading-relaxed mb-16">
              Edit an email and see how the AI risk score changes instantly. 
              Test how small wording changes affect the threat level.
            </p>
            <Button variant="solid" size="lg" className="bg-white text-black hover:bg-gray-200 border-transparent px-20 py-9 text-base" onClick={onEnter}>
              Try Sandbox
            </Button>
         </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="relative z-10 py-40 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-32">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Workflow</h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tight mb-4 leading-tight">How It Works</h3>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">Simple. Fast. Automatic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          <WorkflowStep num="01" title="Email Scan" desc="The email is broken down and analyzed." />
          <WorkflowStep num="02" title="AI Review" desc="Gemini checks language patterns and sender details." />
          <WorkflowStep num="03" title="Classification" desc="The email is labeled as Primary, Threat, or Promotion." />
          <WorkflowStep num="04" title="Report" desc="You get a risk score, explanation, and safety advice." />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-10 md:p-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <i className="fas fa-fingerprint text-black text-xl"></i>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Safe Inbox</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">Technology</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
          </div>
          <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest text-center md:text-right">
            © 2024 NEURAL DEFENSE SYSTEMS • CALIFORNIA
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string, title: string, score: string, desc: string }> = ({ icon, title, score, desc }) => (
  <div className="glass-card p-10 rounded-[3rem] group hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
    <div className="flex justify-between items-start mb-10">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-700">
        <i className={`fas ${icon} text-2xl`}></i>
      </div>
      <div className="text-[10px] font-black text-white/50 border border-white/10 px-4 py-2 rounded-full tracking-widest">
        {score} ACCURACY
      </div>
    </div>
    <h4 className="text-white font-black text-xl md:text-2xl mb-4 tracking-tight uppercase">{title}</h4>
    <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
      {desc}
    </p>
  </div>
);

const WorkflowStep: React.FC<{ num: string, title: string, desc: string }> = ({ num, title, desc }) => (
  <div className="text-center group">
    <div className="text-[80px] md:text-[120px] font-black text-white/5 mb-6 group-hover:text-white/15 transition-all duration-700 select-none leading-none">{num}</div>
    <h4 className="text-white font-black text-xl md:text-2xl mb-4 tracking-tight uppercase">{title}</h4>
    <p className="text-gray-500 text-sm md:text-base leading-relaxed px-6 font-medium">
      {desc}
    </p>
  </div>
);
