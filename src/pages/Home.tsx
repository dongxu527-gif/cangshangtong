import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

interface NewsItem { id: string; title: string; time: string; }

const channels = [
  {
    to: '/radar', title: '商机雷达', desc: '供需智能匹配',
    gradient: 'linear-gradient(135deg, #E8732A, #F4A261)',
    glow: '0 4px 24px rgba(232,115,42,0.3)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="2" fill="white" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="10" /></svg>,
  },
  {
    to: '/policy', title: '政策直通', desc: '补贴政策速递',
    gradient: 'linear-gradient(135deg, #1B3A4B, #2C5F7C)',
    glow: '0 4px 24px rgba(27,58,75,0.2)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  },
  {
    to: '/finance', title: '资金频道', desc: '融资产品对接',
    gradient: 'linear-gradient(135deg, #E9C46A, #F4A261)',
    glow: '0 4px 24px rgba(233,196,106,0.3)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  },
  {
    to: '/emergency', title: '应急频道', desc: '紧急互助通道',
    gradient: 'linear-gradient(135deg, #C0392B, #E74C3C)',
    glow: '0 4px 24px rgba(192,57,43,0.25)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  },
];

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    client.get('/news').then(res => setNews(res.data?.items || res.data || [])).catch(() => {});
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-8 pb-8 relative overflow-hidden" style={{ background: 'var(--gradient-primary)' }}>
        <div className="orb" style={{ width: 200, height: 200, top: -80, left: -40, background: '#F4A261', opacity: 0.6 }} />
        <div className="orb" style={{ width: 160, height: 160, top: -20, right: -60, background: '#1B3A4B', opacity: 0.3, animationDelay: '4s' }} />

        <div className="relative z-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">苍商通</h1>
              <p className="text-sm mt-1 text-white/70">商会企业智慧互联平台</p>
            </div>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
            </div>
          </div>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索商机、政策、资金..."
              className="w-full rounded-2xl pl-11 pr-4 py-3 text-sm bg-white/90 outline-none placeholder:text-gray-400"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 relative z-10">
        <div className="grid grid-cols-2 gap-3 mb-8">
          {channels.map((ch, i) => (
            <Link key={ch.to} to={ch.to} className="glass-card p-5 flex flex-col relative overflow-hidden group animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="channel-icon mb-3" style={{ background: ch.gradient, boxShadow: ch.glow }}>{ch.icon}</div>
              <span className="font-bold text-sm text-text relative z-10">{ch.title}</span>
              <span className="text-xs mt-0.5 relative z-10" style={{ color: 'var(--text-secondary)' }}>{ch.desc}</span>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: ch.gradient }} />
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full" style={{ background: 'var(--gradient-primary)' }} />最新动态
            </h2>
            <span className="text-xs font-medium" style={{ color: '#E8732A' }}>查看全部 →</span>
          </div>
          {news.length === 0 && (
            <div className="glass-card-static text-center py-10" style={{ color: 'var(--text-secondary)' }}>
              <svg className="mx-auto mb-3 opacity-30" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="10" width="36" height="28" rx="4" /><line x1="14" y1="20" x2="34" y2="20" /><line x1="14" y1="26" x2="28" y2="26" /></svg>
              <p className="text-sm">暂无动态</p>
            </div>
          )}
          <div className="space-y-3">
            {news.map((n, i) => (
              <div key={n.id} className="glass-card p-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <p className="text-sm text-text leading-relaxed">{n.title}</p>
                <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>{n.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pb-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm font-bold mb-1" style={{ color: '#E8732A' }}>郑州市苍南商会</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>商会企业互助共赢平台</p>
        </div>
      </div>
    </div>
  );
}
