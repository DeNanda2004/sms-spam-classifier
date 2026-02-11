
import React, { useEffect, useState } from 'react';
import { Email, RiskLevel } from '../types';
import { analyzeEmail } from '../services/geminiService';
import { Button } from './ui/neon-button';

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
  onAnalysisComplete: (emailId: string, result: any, updatedEmail?: Partial<Email>) => void;
  pastSpamPatterns: string[];
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ email, onClose, onAnalysisComplete, pastSpamPatterns }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(email.body);
  const [editSubject, setEditSubject] = useState(email.subject);
  const [editSenderEmail, setEditSenderEmail] = useState(email.senderEmail);
  const [showSimplified, setShowSimplified] = useState(false);

  useEffect(() => {
    if (!email.analysis) {
      handleAnalyze(email.body, email.subject, email.senderEmail);
    } else {
      setEditBody(email.body);
      setEditSubject(email.subject);
      setEditSenderEmail(email.senderEmail);
    }
  }, [email.id]);

  const handleAnalyze = async (body: string, subject: string, senderEmail: string) => {
    setAnalyzing(true);
    try {
      const result = await analyzeEmail({ ...email, body, subject, senderEmail }, pastSpamPatterns);
      onAnalysisComplete(email.id, result, { body, subject, senderEmail });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const analysis = email.analysis;

  const TriggerBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${value * 10}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full bg-black/20 overflow-hidden animate-fade-in">
      {/* EMAIL CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-white/5">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white mb-1">{email.subject}</h1>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-black text-indigo-400 uppercase tracking-widest">{email.sender}</span>
                <span>•</span>
                <span className="font-mono">{email.senderEmail}</span>
              </div>
            </div>
          </div>
          <Button 
            variant={isEditing ? "solid" : "default"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className={`fas ${isEditing ? 'fa-times' : 'fa-flask-vial'} mr-2`}></i>
            {isEditing ? 'Cancel Edit' : 'Edit & Re-Scan'}
          </Button>
        </div>

        <div className="p-10 flex-1 overflow-y-auto">
          {isEditing ? (
            <div className="h-full flex flex-col gap-6 animate-fade-in">
              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex items-center gap-4">
                <i className="fas fa-edit text-indigo-400"></i>
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Edit email content to test the AI scanner</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-indigo-500/50 transition-colors"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    placeholder="Enter subject..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sender</label>
                  <input 
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none focus:border-indigo-500/50 transition-colors"
                    value={editSenderEmail}
                    onChange={(e) => setEditSenderEmail(e.target.value)}
                    placeholder="sender@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Body</label>
                <textarea 
                  className="flex-1 w-full p-8 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-mono text-sm resize-none text-gray-200 leading-relaxed"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  placeholder="Type email body here..."
                />
              </div>
              
              <Button 
                variant="solid"
                size="lg"
                onClick={() => handleAnalyze(editBody, editSubject, editSenderEmail)}
                className="w-full"
                disabled={analyzing}
              >
                {analyzing ? <i className="fas fa-sync fa-spin mr-2"></i> : <i className="fas fa-search mr-2"></i>}
                Start Scanning
              </Button>
            </div>
          ) : (
            <div className="text-gray-300 leading-loose whitespace-pre-wrap font-serif text-xl p-4">
              {email.body}
            </div>
          )}
        </div>
      </div>

      {/* ANALYSIS PANEL */}
      <div className="w-full lg:w-[400px] bg-black/40 backdrop-blur-3xl p-8 overflow-y-auto h-full border-l border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
              <i className="fas fa-brain"></i>
            </div>
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Analysis</h2>
          </div>
          {analysis && (
            <button 
              onClick={() => setShowSimplified(!showSimplified)}
              className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showSimplified ? 'System Logs' : 'Simple View'}
            </button>
          )}
        </div>

        {analyzing ? (
          <div className="py-24 text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
            </div>
            <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">Analyzing...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-8 animate-fade-in">
            {showSimplified ? (
              <div className="glass-card p-8 rounded-3xl border-2 border-indigo-500/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <i className="fas fa-lightbulb text-6xl"></i>
                </div>
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Summary</h3>
                <p className="text-white font-semibold text-lg italic leading-relaxed">"{analysis.simplified_explanation}"</p>
              </div>
            ) : (
              <>
                <div className="glass-card p-6 rounded-3xl border shadow-2xl relative">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Risk Level</span>
                      <div className={`text-3xl font-black mt-1 ${analysis.risk_score > 60 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {analysis.risk_score}%
                      </div>
                    </div>
                    <div className="text-[10px] font-black px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5 uppercase">
                      {analysis.risk_level}
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-[1.5s] ease-out shadow-[0_0_15px_rgba(255,255,255,0.2)] ${analysis.risk_score > 60 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${analysis.risk_score}%` }}
                    />
                  </div>
                </div>

                {analysis.impersonation_target && (
                  <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4">
                    <i className="fas fa-mask text-red-500 mt-1 text-lg"></i>
                    <div>
                      <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-1">Impersonation Alert</h4>
                      <p className="text-xs text-red-200/60 leading-normal">The sender may be pretending to be <span className="text-white font-bold">{analysis.impersonation_target}</span>.</p>
                    </div>
                  </div>
                )}

                <div className="glass-card p-6 rounded-3xl border space-y-5">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Risk Factors</h3>
                  <TriggerBar label="Urgency" value={analysis.emotional_triggers.urgency} color="bg-red-500" />
                  <TriggerBar label="Fear" value={analysis.emotional_triggers.fear} color="bg-orange-500" />
                  <TriggerBar label="Financial Gain" value={analysis.emotional_triggers.greed} color="bg-emerald-500" />
                  <TriggerBar label="Authority" value={analysis.emotional_triggers.authority} color="bg-indigo-500" />
                </div>

                {analysis.link_analysis.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Link Check</h3>
                    {analysis.link_analysis.map((l, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-2xl border text-xs">
                        <div className="font-mono text-indigo-400 truncate mb-2">{l.url}</div>
                        <div className={`font-bold flex items-center gap-2 ${l.risk === 'High' ? 'text-red-500' : 'text-emerald-500'}`}>
                          <i className={`fas ${l.risk === 'High' ? 'fa-triangle-exclamation' : 'fa-check'}`}></i>
                          {l.risk} Risk: {l.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-2xl glow-indigo border border-indigo-400/20">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3">Suggested Action</h4>
                  <p className="text-sm font-bold leading-relaxed">{analysis.suggested_action}</p>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
