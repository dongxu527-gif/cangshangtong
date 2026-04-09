import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

interface RadarItem { id: string; title: string; type: string; tags: string[]; match: number; location: string; time: string; summary: string; }

function CircleMatch({ value }: { value: number }) {
  const [anim, setAnim] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnim(value), 100); return () => clearTimeout(t); }, [value]);
  const r = 18, c = 2 * Math.PI * r, offset = c - (anim / 100) * c;
  const color = anim >= 80 ? '#E8732A' : anim >= 60 ? '#1B3A4B' : '#C4B8AA';
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width="40" height="40" className="-rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#F0EBE5" strokeWidth="3" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <span className="absolute text-[10px] font-bold" style={{ color }}>{anim}%</span>
    </div>
  );
}

export default function Radar() {
  const [items, setItems] = useState<RadarItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<'全部' | '供应' | '需求'>('全部');
  const [industry, setIndustry] = useState('全部');
  const [region, setRegion] = useState('全部');
  const [search, setSearch] = useState('');
  const [industries, setIndustries] = useState<string[]>(['全部']);
  const [regions, setRegions] = useState<string[]>(['全部']);
  const navigate = useNavigate();

  useEffect(() => {
    client.get('/radar').then(res => {
      const data: RadarItem[] = res.data?.items || res.data || [];
      setItems(data);
      const tags = new Set<string>(), locs = new Set<string>();
      data.forEach(d => { d.tags.forEach(t => tags.add(t)); locs.add(d.location); });
      setIndustries(['全部', ...Array.from(tags)]); setRegions(['全部', ...Array.from(locs)]);
    }).catch(() => {});
  }, []);

  const filtered = items.filter(d => {
    if (typeFilter !== '全部' && d.type !== typeFilter) return false;
    if (industry !== '全部' && !d.tags.some(t => t.includes(industry))) return false;
    if (region !== '全部' && d.location !== region) return false;
    if (search && !d.title.includes(search) && !d.summary.includes(search)) return false;
    return true;
  });

  const handlePost = useCallback(() => { if (!localStorage.getItem('token')) return navigate('/login'); navigate('/radar/post'); }, [navigate]);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full" style={{ background: 'var(--gradient-primary)' }} />商机雷达
        </h1>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8A99A" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索商机..." className="cyber-input w-full pl-11" />
        </div>
      </div>
      <div className="px-5 mb-3 flex gap-2">
        {(['全部', '供应', '需求'] as const).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className="px-5 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{ background: typeFilter === t ? 'var(--gradient-primary)' : '#fff', color: typeFilter === t ? '#fff' : 'var(--text-secondary)', boxShadow: typeFilter === t ? 'var(--neon-purple)' : '0 1px 4px rgba(0,0,0,0.04)' }}>
            {t}
          </button>
        ))}
      </div>
      <div className="px-5 mb-3 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {industries.map(i => (
          <button key={i} onClick={() => setIndustry(i)} className="px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all"
            style={{ background: industry === i ? 'rgba(232,115,42,0.1)' : '#fff', color: industry === i ? '#E8732A' : 'var(--text-secondary)', border: `1px solid ${industry === i ? 'rgba(232,115,42,0.2)' : 'rgba(232,115,42,0.06)'}` }}>
            {i}
          </button>
        ))}
      </div>
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {regions.map(r => (
          <button key={r} onClick={() => setRegion(r)} className="px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all"
            style={{ background: region === r ? 'rgba(27,58,75,0.08)' : '#fff', color: region === r ? '#1B3A4B' : 'var(--text-secondary)', border: `1px solid ${region === r ? 'rgba(27,58,75,0.15)' : 'rgba(232,115,42,0.06)'}` }}>
            {r}
          </button>
        ))}
      </div>
      <div className="px-4 space-y-3 pb-24">
        {filtered.length === 0 && <div className="glass-card-static text-center py-12" style={{ color: 'var(--text-secondary)' }}>暂无匹配商机</div>}
        {filtered.map((item, i) => (
          <Link key={item.id} to={`/radar/${item.id}`} className="glass-card flex overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="w-1 shrink-0 rounded-l-full" style={{ background: item.type === '供应' ? 'var(--gradient-primary)' : 'var(--gradient-cool)' }} />
            <div className="p-4 flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-sm text-text truncate flex-1 mr-2">{item.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-lg font-medium shrink-0" style={{ background: item.type === '供应' ? 'rgba(232,115,42,0.08)' : 'rgba(27,58,75,0.06)', color: item.type === '供应' ? '#E8732A' : '#1B3A4B' }}>{item.type}</span>
              </div>
              <div className="flex gap-1.5 mb-2">{item.tags.map(tag => <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(232,115,42,0.05)', color: 'var(--text-secondary)' }}>{tag}</span>)}</div>
              <p className="text-xs line-clamp-2 mb-2.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>
              <div className="flex items-center justify-between">
                <CircleMatch value={item.match} />
                <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{item.location} · {item.time}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={handlePost} className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-2xl flex items-center justify-center animate-glow" style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--neon-purple)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
      </button>
    </div>
  );
}
