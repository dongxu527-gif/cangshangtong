import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

interface PolicyItem { id: string; title: string; category: string; deadline: string; source: string; subsidy?: string; urgent?: boolean; }

const categoryColors: Record<string, string> = {
  '资金补贴': '#E8732A', '税收优惠': '#1B3A4B', '创新支持': '#F4A261',
  '认定资质': '#2C5F7C', '人才政策': '#C0392B',
};

function CountdownTag({ deadline }: { deadline: string }) {
  const [days, setDays] = useState(0);
  useEffect(() => { setDays(Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000))); }, [deadline]);
  if (days <= 7) return <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold animate-pulse-red" style={{ background: 'rgba(192,57,43,0.08)', color: '#C0392B' }}>剩余{days}天</span>;
  return <span className="text-[10px] px-2 py-0.5 rounded-lg" style={{ background: 'rgba(232,115,42,0.05)', color: 'var(--text-secondary)' }}>截止{days}天后</span>;
}

export default function Policy() {
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [cat, setCat] = useState('全部');
  const [categories, setCategories] = useState<string[]>(['全部']);

  useEffect(() => {
    client.get('/policy').then(res => {
      const data: PolicyItem[] = res.data?.items || res.data || [];
      setPolicies(data); setCategories(['全部', ...Array.from(new Set(data.map(p => p.category)))]);
    }).catch(() => {});
  }, []);

  const filtered = cat === '全部' ? policies : policies.filter(p => p.category === cat);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-5 pb-2">
        <h1 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full" style={{ background: 'var(--gradient-cool)' }} />政策直通
        </h1>
      </div>
      <div className="px-4 mb-4 flex gap-1 overflow-x-auto hide-scrollbar pb-1">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} className="px-4 py-2 text-sm whitespace-nowrap font-medium transition-all rounded-xl"
            style={{ color: cat === c ? (categoryColors[c] || '#E8732A') : 'var(--text-secondary)', background: cat === c ? `${categoryColors[c] || '#E8732A'}10` : 'transparent' }}>
            {c}
          </button>
        ))}
      </div>
      <div className="px-4 space-y-3 pb-8">
        {filtered.length === 0 && <div className="glass-card-static text-center py-12" style={{ color: 'var(--text-secondary)' }}>暂无相关政策</div>}
        {filtered.map((p, i) => {
          const color = categoryColors[p.category] || '#F4A261';
          return (
            <Link key={p.id} to={`/policy/${p.id}`} className="glass-card flex overflow-hidden animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, ...(p.urgent ? { boxShadow: '0 0 0 2px rgba(192,57,43,0.15), 0 4px 20px rgba(192,57,43,0.06)' } : {}) }}>
              <div className="w-1 shrink-0 rounded-l-full" style={{ background: p.urgent ? '#C0392B' : color }} />
              {p.urgent && <div className="w-1 shrink-0 animate-pulse-red" style={{ background: '#C0392B' }} />}
              <div className="p-4 flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="font-bold text-sm text-text leading-snug flex-1 mr-2">{p.title}</h3>
                  {p.urgent && <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold animate-pulse-red shrink-0" style={{ background: 'rgba(192,57,43,0.08)', color: '#C0392B' }}>紧急</span>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-lg font-medium" style={{ background: `${color}10`, color }}>{p.category}</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{p.source}</span>
                  <CountdownTag deadline={p.deadline} />
                </div>
                {p.subsidy && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-xl" style={{ background: 'rgba(232,115,42,0.06)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8732A" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                    <span className="text-xs font-bold ml-1" style={{ color: '#E8732A' }}>{p.subsidy}</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
