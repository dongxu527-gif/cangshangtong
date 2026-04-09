import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: '首页', activeColor: '#E8732A',
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#E8732A' : 'none'} stroke={a ? '#E8732A' : '#C4B8AA'} strokeWidth="1.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg> },
  { to: '/radar', label: '商机', activeColor: '#F4A261',
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#E8732A' : '#C4B8AA'} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" fill={a ? '#E8732A' : 'none'} /></svg> },
  { to: '/policy', label: '政策', activeColor: '#1B3A4B',
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#1B3A4B' : '#C4B8AA'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
  { to: '/emergency', label: '应急', activeColor: '#C0392B',
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#C0392B' : '#C4B8AA'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  { to: '/profile', label: '我的', activeColor: '#2C5F7C',
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#2C5F7C' : '#C4B8AA'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', borderTop: '1px solid rgba(232,115,42,0.06)' }}>
      <div className="max-w-md mx-auto flex justify-around py-2">
        {tabs.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.to === '/'}
            className={({ isActive }) => `flex flex-col items-center text-xs pt-1 pb-0.5 transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
            {({ isActive }) => (
              <>
                <div className="relative">
                  {t.icon(isActive)}
                  {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: t.activeColor }} />}
                </div>
                <span className="mt-1 font-medium transition-colors duration-300" style={{ color: isActive ? t.activeColor : '#C4B8AA' }}>{t.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
