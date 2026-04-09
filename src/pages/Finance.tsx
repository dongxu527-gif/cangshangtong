import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

interface FinanceProduct { id: string; name: string; bank: string; rate: string; amount: string; term: string; green: boolean; }

export default function Finance() {
  const [products, setProducts] = useState<FinanceProduct[]>([]);
  useEffect(() => { client.get('/finance').then(res => setProducts(res.data?.items || res.data || [])).catch(() => {}); }, []);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-5 pb-2">
        <h1 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full" style={{ background: 'var(--gradient-gold)' }} />资金频道
        </h1>
      </div>
      <div className="px-4 mb-5">
        <div className="glass-card-static p-5 relative overflow-hidden" style={{ background: 'var(--gradient-primary)' }}>
          <div className="orb" style={{ width: 140, height: 140, top: -60, right: -30, background: '#E9C46A', opacity: 0.4 }} />
          <div className="orb" style={{ width: 100, height: 100, bottom: -40, left: -20, background: '#1B3A4B', animationDelay: '5s', opacity: 0.3 }} />
          <div className="relative z-10 text-white">
            <h2 className="text-lg font-bold mb-1">商会专属融资服务</h2>
            <p className="text-sm opacity-70">优惠利率 · 快速审批 · 专属通道</p>
            <div className="flex gap-6 mt-4">
              <div><div className="text-2xl font-bold" style={{ color: '#E9C46A' }}>{products.length}</div><div className="text-xs opacity-60">在架产品</div></div>
              <div><div className="text-2xl font-bold" style={{ color: '#55EFC4' }}>{products.filter(p => p.green).length}</div><div className="text-xs opacity-60">绿色通道</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 space-y-3 mb-6">
        {products.map((p, i) => (
          <div key={p.id} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="relative p-5" style={{ background: 'linear-gradient(135deg, rgba(232,115,42,0.04), rgba(27,58,75,0.03))' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-primary)', opacity: 0.2 }} />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div><h3 className="font-bold text-base text-text">{p.name}</h3><p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{p.bank}</p></div>
                {p.green && <span className="text-[10px] px-2.5 py-1 rounded-lg font-bold text-white" style={{ background: 'var(--gradient-gold)', color: '#1A1A1A' }}>✦ 绿色通道</span>}
              </div>
              <div className="grid grid-cols-3 gap-2 relative z-10">
                <div><div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>年利率</div><div className="text-lg font-bold" style={{ color: '#E8732A' }}>{p.rate}</div></div>
                <div><div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>额度</div><div className="text-sm font-bold text-text">{p.amount}</div></div>
                <div><div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>期限</div><div className="text-sm font-bold text-text">{p.term}</div></div>
              </div>
            </div>
            <div className="p-3"><button className="neon-btn w-full py-2.5 text-sm">申请贷款</button></div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-8">
        <Link to="/finance/demand" className="glass-card p-4 flex items-center justify-between">
          <div><div className="font-bold text-sm text-text">发布融资需求</div><div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>让银行主动找你</div></div>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-gold)', boxShadow: '0 4px 15px rgba(233,196,106,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
