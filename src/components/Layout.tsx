import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen max-w-md mx-auto relative" style={{ background: 'var(--bg)' }}>
      <div className="pb-16"><Outlet /></div>
      <BottomNav />
    </div>
  );
}
