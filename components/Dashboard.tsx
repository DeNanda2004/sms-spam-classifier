
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Email, EmailCategory } from '../types';

interface DashboardProps {
  emails: Email[];
}

const COLORS = {
  [EmailCategory.GENUINE]: '#10b981',
  [EmailCategory.SPAM]: '#ef4444',
  [EmailCategory.PROMOTIONS]: '#3b82f6'
};

export const Dashboard: React.FC<DashboardProps> = ({ emails }) => {
  const analyzed = emails.filter(e => !!e.analysis);
  
  const categoryCounts = emails.reduce((acc, email) => {
    const cat = email.analysis?.category || email.initialCategory;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const threatCounts = analyzed.reduce((acc, email) => {
    email.analysis?.detected_threats.forEach(t => {
      acc[t] = (acc[t] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const riskyDomains = analyzed.filter(e => e.analysis?.risk_score! > 50).reduce((acc, email) => {
    const domain = email.senderEmail.split('@')[1];
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(threatCounts).sort((a,b) => (b[1] as number) - (a[1] as number)).slice(0, 5).map(([name, count]) => ({ name, count }));

  const avgRisk = analyzed.length ? Math.round(analyzed.reduce((acc, e) => acc + (e.analysis?.risk_score || 0), 0) / analyzed.length) : 0;

  return (
    <div className="p-10 h-full overflow-y-auto space-y-10 bg-transparent animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Security Overview</h1>
          <p className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Summary of Recent Activity</p>
        </div>
        <div className="glass-card p-6 rounded-[2.5rem] text-center min-w-[140px] border-indigo-500/20 glow-indigo">
          <div className="text-4xl font-black text-white">{avgRisk}%</div>
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Average Risk</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/5">
          <h2 className="text-xs font-black mb-8 text-gray-500 uppercase tracking-widest">Email Categories</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={80} 
                  outerRadius={100} 
                  paddingAngle={8} 
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[entry.name as EmailCategory]} fillOpacity={0.8} />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border border-white/5">
          <h2 className="text-xs font-black mb-8 text-gray-500 uppercase tracking-widest">Common Threats</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} fontSize={10} stroke="#4b5563" />
                <Tooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                   contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 glass-card p-8 rounded-[2.5rem] border border-red-500/10">
          <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-6">Risky Domains</h3>
          <div className="space-y-4">
            {Object.entries(riskyDomains).sort((a,b) => (b[1] as number) - (a[1] as number)).slice(0, 4).map(([domain, count], i) => (
              <div key={i} className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="font-mono text-gray-400 truncate mr-3">{domain}</span>
                <span className="font-black text-red-500">{count} flags</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2 glass-card p-10 rounded-[2.5rem] border border-emerald-500/10 flex flex-col justify-center items-center text-center group">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-500">
            <i className="fas fa-shield-alt text-4xl"></i>
          </div>
          <p className="text-white font-black text-2xl tracking-tight mb-2">Scanner Active</p>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            All systems are running normally. Our AI has successfully identified and isolated multiple threats in your inbox today.
          </p>
        </div>
      </div>
    </div>
  );
};
