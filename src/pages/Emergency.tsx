import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

interface EmergencyItem { id: string; title: string; level: string; location: string; time: string; deadline: number; author: string; type?: string; phone?: string; }

function Countdown({ deadline }: { deadline: number }) {
  const [diff, setDiff] = useState(deadline - Date.now());
  useEffect(() => { const t = setInterval(() => setDiff(Math.max(0, deadline - Date.now())), 60000); return () => clearInterval(t); }, [deadline]);
  const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000);
  return <span className="font-bold text-base" style={{ color: '#C0392B', animation: diff < 3600000 ? 'pulse-red 1.2s ease-in-out infinite' : 'none' }}>{h}<span className="text-xs font-normal mx-0.5" style={{ color: 'var(--text-secondary)' }}>时</span>{m}<span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>分</span></span>;
}

const typeIcons: Record<string, JSX.Element> = {
  '仓储': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="12" rx="1" /><path d="M3 8l9-5 9 5" /></svg>,
  '供应链': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="12" r="3" /><circle cx="18" cy="12" r="3" /><line x1="9" y1="12" x2="15" y2="12" /></svg>,
  '资金': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
};

export default function Emergency() {
  const [items, setItems] = useState<EmergencyItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => { client.get('/emergency').then(res => setItems(res.data?.items || res.data || [])).catch(() => {}); }, []);
  const handlePost = useCallback(() => { if (!localStorage.getItem('token')) return navigate('/login'); navigate('/emergency/post'); }, [navigate]);
  const handleCall = useCallback((phone?: string) => { if (phone) window.location.href = `tel:${phone}`; }, []);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-5 pb-2">
        <h1 className="text-xl font-bold text-text mb-1 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #C0392B, #E74C3C)' }} />应急频道
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>商会成员紧急互助，快速响应</p>
      </div>
      <div className="px-4 space-y-3 pb-24">
        {items.length === 0 && (
          <div className="glass-card-static text-center py-16" style={{ color: 'var(--text-secondary)' }}>
            <svg className="mx-auto mb-3 opacity-20" width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="40" cy="40" r="30" /><circle cx="40" cy="40" r="5" /></svg>
            <p className="text-base font-semibold mb-1">风平浪静</p><p className="text-sm">暂无应急信息</p>
          </div>
        )}
        {items.map(e => (
          <div key={e.id} className="glass-card flex overflow-hidden" style={e.level === '特急' ? { boxShadow: '0 0 0 2px rgba(192,57,43,0.2), 0 4px 20px rgba(192,57,43,0.08)' } : {}}>
            <div className="w-1 shrink-0 rounded-l-full" style={{ background: e.level === '特急' ? '#C0392B' : 'rgba(192,57,43,0.3)' }} />
            {e.level === '特急' && <div className="w-0.5 shrink-0 animate-pulse-red" style={{ background: '#C0392B' }} />}
            <div className="p-4 flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span style={{ color: '#C0392B' }}>{typeIcons[e.type || ''] || typeIcons['资金']}</span>
                  <h3 className="font-bold text-sm text-text truncate">{e.title}</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold shrink-0 ml-2" style={{ background: 'rgba(192,57,43,0.08)', color: '#C0392B', animation: e.level === '特急' ? 'pulse-red 1.2s ease-in-out infinite' : 'none' }}>{e.level}</span>
              </div>
              <div className="mb-3"><span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{e.location} · {e.author} · {e.time}</span></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1"><span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>剩余</span><Countdown deadline={e.deadline} /></div>
                <button onClick={() => handleCall(e.phone)} className="px-4 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #C0392B, #E74C3C)', boxShadow: '0 4px 15px rgba(192,57,43,0.2)' }}>一键拨打</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePost} className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C0392B, #E74C3C)', boxShadow: 'var(--neon-pink)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
      </button>
    </div>
  );
}
