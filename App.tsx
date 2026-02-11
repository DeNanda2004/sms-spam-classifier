
import React, { useState, useMemo } from 'react';
import { PRELOADED_EMAILS } from './constants';
import { Email, EmailCategory, ViewType, RiskLevel, AnalysisResult } from './types';
import { EmailDetail } from './components/EmailDetail';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { analyzeEmail } from './services/geminiService';
import { Button } from './components/ui/neon-button';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [emails, setEmails] = useState<Email[]>(PRELOADED_EMAILS);
  const [activeView, setActiveView] = useState<ViewType>('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [draftSubject, setDraftSubject] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [draftAnalysis, setDraftAnalysis] = useState<AnalysisResult | null>(null);
  const [isScanningDraft, setIsScanningDraft] = useState(false);

  const pastSpamPatterns = useMemo(() => {
    return emails
      .filter(e => e.analysis?.category === EmailCategory.SPAM)
      .slice(0, 5)
      .map(e => e.analysis?.reasons.join(', ')) as string[];
  }, [emails]);

  const handleAnalysisComplete = (emailId: string, result: AnalysisResult, updatedEmail?: Partial<Email>) => {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, analysis: result, ...updatedEmail } : e));
  };

  const scanDraft = async () => {
    if (!draftBody.trim()) return;
    setIsScanningDraft(true);
    try {
      const result = await analyzeEmail({ subject: draftSubject, body: draftBody }, pastSpamPatterns);
      setDraftAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanningDraft(false);
    }
  };

  const filteredEmails = useMemo(() => {
    let base = emails;
    if (activeView === 'spam') base = base.filter(e => (e.analysis?.category === EmailCategory.SPAM) || (!e.analysis && e.initialCategory === EmailCategory.SPAM));
    else if (activeView === 'promotions') base = base.filter(e => (e.analysis?.category === EmailCategory.PROMOTIONS) || (!e.analysis && e.initialCategory === EmailCategory.PROMOTIONS));
    else if (activeView === 'high-risk') base = base.filter(e => e.analysis?.risk_level === RiskLevel.HIGH);
    else if (activeView === 'inbox') base = base.filter(e => (e.analysis?.category === EmailCategory.GENUINE) || (!e.analysis && e.initialCategory === EmailCategory.GENUINE));
    
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      base = base.filter(e => e.subject.toLowerCase().includes(lower) || e.sender.toLowerCase().includes(lower) || e.body.toLowerCase().includes(lower));
    }
    return base;
  }, [emails, activeView, searchTerm]);

  const selectedEmail = useMemo(() => emails.find(e => e.id === selectedEmailId), [emails, selectedEmailId]);

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  const SidebarItem: React.FC<{ view: ViewType, icon: string, label: string, badge?: number }> = ({ view, icon, label, badge }) => (
    <button
      onClick={() => { setActiveView(view); setSelectedEmailId(null); setIsSidebarOpen(false); }}
      className={`w-full flex items-center justify-between px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
        activeView === view 
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 glow-indigo' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center gap-3">
        <i className={`fas ${icon} w-5 text-lg transition-transform group-hover:scale-110`}></i>
        <span>{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${activeView === view ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/10 text-gray-400'}`}>
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#050505] text-white p-2 md:p-4 gap-2 md:gap-4 animate-fade-in relative overflow-hidden">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 glass rounded-2xl mb-2">
        <div className="flex items-center gap-3" onClick={() => setShowLanding(true)}>
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <i className="fas fa-fingerprint text-black text-sm"></i>
          </div>
          <span className="font-extrabold tracking-tighter uppercase text-sm">Safe Inbox</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-10 h-10 flex items-center justify-center glass rounded-xl">
          <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-0 z-[110] md:relative md:z-0 md:flex w-full md:w-72 glass rounded-3xl p-6 flex-col gap-8 shadow-2xl border-white/5 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center gap-4 px-2 cursor-pointer mb-4 md:mb-0" onClick={() => setShowLanding(true)}>
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-fingerprint text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tighter uppercase">Safe Inbox</h1>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">AI Scanner v4.0</p>
          </div>
        </div>

        <div className="px-1">
          <Button 
            variant="solid" 
            size="lg"
            className="w-full py-4"
            onClick={() => { setActiveView('compose'); setIsSidebarOpen(false); }}
          >
            <i className="fas fa-search"></i>
            Analyze New
          </Button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <SidebarItem view="inbox" icon="fa-envelope" label="Inbox" badge={emails.filter(e => !e.analysis && e.initialCategory === EmailCategory.GENUINE).length} />
          <SidebarItem view="spam" icon="fa-shield-halved" label="Spam" />
          <SidebarItem view="promotions" icon="fa-bolt" label="Promotions" />
          <div className="my-6 border-t border-white/5 mx-2"></div>
          <SidebarItem view="high-risk" icon="fa-triangle-exclamation" label="High Risk" badge={emails.filter(e => e.analysis?.risk_level === RiskLevel.HIGH).length} />
          <SidebarItem view="dashboard" icon="fa-chart-pie" label="Dashboard" />
        </nav>

        <div className="glass-card p-4 rounded-2xl mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[94%]"></div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 glass rounded-3xl overflow-hidden shadow-2xl relative border-white/5 flex flex-col">
        {activeView === 'compose' ? (
          <div className="flex flex-col lg:flex-row h-full animate-fade-in overflow-y-auto">
            <div className="flex-1 p-6 md:p-10 space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-2">Scan Draft</h2>
                <p className="text-gray-500">Paste an email below to analyze it for potential risks.</p>
              </div>
              <div className="space-y-4">
                <input 
                  placeholder="Subject" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold outline-none focus:border-indigo-500/50 transition-colors"
                  value={draftSubject}
                  onChange={(e) => setDraftSubject(e.target.value)}
                />
                <textarea 
                  placeholder="Paste email body here..."
                  className="w-full h-64 md:h-80 bg-white/5 border border-white/10 rounded-3xl p-6 text-lg outline-none resize-none font-serif focus:border-indigo-500/50 transition-colors"
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                />
              </div>
              <Button 
                variant="solid"
                size="lg"
                onClick={scanDraft}
                disabled={isScanningDraft}
                className="w-full py-5 text-lg"
              >
                {isScanningDraft ? <i className="fas fa-sync fa-spin"></i> : <i className="fas fa-search"></i>}
                Analyze Email
              </Button>
            </div>
            <div className="w-full lg:w-96 bg-black/40 backdrop-blur-3xl p-6 md:p-10 border-l border-white/5 lg:h-full">
               <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-8 text-center">Scan Result</h3>
               {draftAnalysis ? (
                 <div className="space-y-8 animate-fade-in">
                    <div className="glass-card p-8 rounded-3xl text-center border-indigo-500/20 glow-indigo">
                      <div className="text-5xl font-black text-white">{draftAnalysis.risk_score}%</div>
                      <div className="text-[10px] font-bold text-indigo-400 uppercase mt-2 tracking-widest">Risk Score</div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-sm font-extrabold text-white flex items-center gap-2">
                        <i className="fas fa-info-circle text-indigo-400"></i>
                        Analysis
                      </div>
                      <div className={`p-5 rounded-2xl text-sm leading-relaxed font-medium ${draftAnalysis.risk_score > 30 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {draftAnalysis.suggested_action}
                      </div>
                      <div className="space-y-3">
                        {draftAnalysis.reasons.map((r, i) => (
                          <div key={i} className="flex gap-3 text-xs text-gray-400 leading-normal">
                            <span className="text-indigo-500 font-bold">•</span>
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-12 md:py-0">
                   <i className="fas fa-search text-6xl mb-6"></i>
                   <p className="font-bold text-sm uppercase tracking-widest">Ready to Scan</p>
                 </div>
               )}
            </div>
          </div>
        ) : activeView === 'dashboard' ? (
          <div className="animate-fade-in h-full overflow-y-auto">
            <Dashboard emails={emails} />
          </div>
        ) : selectedEmailId && selectedEmail ? (
          <div className="animate-fade-in h-full overflow-y-auto">
            <EmailDetail email={selectedEmail} onClose={() => setSelectedEmailId(null)} onAnalysisComplete={handleAnalysisComplete} pastSpamPatterns={pastSpamPatterns} />
          </div>
        ) : (
          <div className="flex flex-col h-full animate-fade-in">
            {/* SEARCH HEADER */}
            <div className="p-4 md:p-8 border-b border-white/5 bg-white/[0.02]">
              <div className="relative flex-1 group max-w-2xl">
                <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"></i>
                <input 
                  type="text" 
                  placeholder="Search emails..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold outline-none focus:border-indigo-500/30" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto px-2 md:px-4 py-4 space-y-2">
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email, i) => (
                  <div 
                    key={email.id} 
                    onClick={() => setSelectedEmailId(email.id)} 
                    className="group flex flex-col md:flex-row items-start md:items-center px-6 py-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5 relative overflow-hidden animate-fade-in gap-3 md:gap-0"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <div className="w-full md:w-48 shrink-0 md:mr-6">
                      <span className="font-extrabold text-white text-sm truncate block">{email.sender}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase truncate block">{email.senderEmail}</span>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <span className="text-sm font-bold text-gray-200 block truncate group-hover:text-indigo-300 transition-colors">{email.subject}</span>
                      <span className="text-xs text-gray-500 truncate block mt-0.5">{email.preview}</span>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 w-full md:w-auto md:ml-6">
                      {email.analysis && (
                        <div className={`text-[10px] font-black px-3 py-1.5 rounded-lg border ${
                          email.analysis.risk_score > 60 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}>
                          {email.analysis.risk_score}% RISK
                        </div>
                      )}
                      <span className="text-[10px] font-black text-gray-600 w-16 text-right uppercase">{email.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-700 py-12">
                  <i className="fas fa-inbox text-6xl mb-6 opacity-10"></i>
                  <p className="font-black text-xl tracking-tighter uppercase opacity-30">No emails found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
