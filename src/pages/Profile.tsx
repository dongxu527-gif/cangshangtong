import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

function StatItem({ value, label }: { value: number; label: string }) {
  const [anim, setAnim] = useState(0);
  useEffect(() => {
    let frame: number; const start = performance.now();
    const a = (now: number) => { const p = Math.min((now - start) / 800, 1); setAnim(Math.round((1 - Math.pow(1 - p, 3)) * value)); if (p < 1) frame = requestAnimationFrame(a); };
    frame = requestAnimationFrame(a); return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <span className="text-lg font-bold text-white">{anim}</span>
      </div>
      <span className="text-xs mt-1.5 text-white/60">{label}</span>
    </div>
  );
}

const menuGroups = [
  { items: [
    { to: '/profile/posts', label: '我的发布', color: '#E8732A', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8732A" strokeWidth="1.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> },
    { to: '/profile/matches', label: '我的匹配', color: '#1B3A4B', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3A4B" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="rgba(27,58,75,0.1)" /></svg> },
    { to: '/profile/messages', label: '消息通知', color: '#E9C46A', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>, badge: 3 },
  ]},
  { items: [
    { to: '/finance/demand', label: '融资需求', color: '#C0392B', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg> },
  ]},
];

export default function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [user, setUser] = useState<{ name?: string; company?: string; level?: string }>({});

  useEffect(() => {
    if (isLoggedIn) client.get('/user/profile').then(res => setUser(res.data || {})).catch(() => {});
  }, [isLoggedIn]);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-8 pb-6 text-white relative overflow-hidden" style={{ background: 'var(--gradient-vivid)' }}>
        <div className="orb" style={{ width: 200, height: 200, top: -80, right: -60, background: '#F4A261', opacity: 0.4 }} />
        <div className="orb" style={{ width: 140, height: 140, bottom: -40, left: -40, background: '#2C5F7C', animationDelay: '3s', opacity: 0.3 }} />
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-[72px] h-[72px] rounded-3xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
            {isLoggedIn ? <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>}
          </div>
          <div className="flex-1">
            {isLoggedIn ? (<>
              <div className="text-xl font-bold">{user.name || '商会会员'}</div>
              <div className="text-sm opacity-60 mt-0.5">{user.company || '郑州市苍南商会'}</div>
              <div className="inline-flex items-center mt-2 px-3 py-1 rounded-xl text-[10px] font-bold" style={{ background: 'var(--gradient-gold)', color: '#1A1A1A' }}>✦ {user.level || '会员'}</div>
            </>) : <button onClick={() => navigate('/login')} className="text-xl font-bold">点击登录</button>}
          </div>
        </div>
        <div className="flex justify-around relative z-10">
          <StatItem value={12} label="发布" /><StatItem value={28} label="匹配" /><StatItem value={5} label="成交" />
        </div>
      </div>

      <div className="px-4 -mt-1 relative z-10">
        {menuGroups.map((group, gi) => (
          <div key={gi} className="glass-card-static overflow-hidden mb-3 p-1">
            {group.items.map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-colors hover:bg-orange-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${item.color}10` }}>{item.icon}</div>
                  <span className="text-sm text-text">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && <span className="min-w-[20px] h-5 rounded-full text-[10px] font-bold flex items-center justify-center px-1.5 text-white" style={{ background: '#C0392B' }}>{item.badge}</span>}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1C8BE" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </Link>
            ))}
          </div>
        ))}
        <div className="glass-card-static overflow-hidden mb-3 p-1">
          <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-orange-50/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,115,42,0.06)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8732A" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg></div>
              <span className="text-sm text-text">设置</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1C8BE" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
          {isLoggedIn && (
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="w-full text-left px-4 py-3.5 rounded-2xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">退出登录</button>
          )}
        </div>
      </div>
    </div>
  );
}
