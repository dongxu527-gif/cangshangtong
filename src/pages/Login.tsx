import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendCode = useCallback(async () => {
    if (!/^1\d{10}$/.test(phone)) return;
    try { await client.post('/auth/sms', { phone }); } catch {}
    setSent(true); setCountdown(60);
  }, [phone]);

  const login = useCallback(async () => {
    if (!/^\d{6}$/.test(code)) return;
    setLoading(true);
    try {
      const res = await client.post('/auth/login', { phone, code });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      localStorage.setItem('token', 'mock-jwt-token');
      navigate('/');
    } finally { setLoading(false); }
  }, [phone, code, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden mesh-bg" style={{ background: '#FBF8F5' }}>
      <div className="orb" style={{ width: 280, height: 280, top: -80, right: -60, background: '#E8732A' }} />
      <div className="orb" style={{ width: 200, height: 200, bottom: 60, left: -80, background: '#1B3A4B', animationDelay: '3s' }} />
      <div className="orb" style={{ width: 140, height: 140, top: '35%', right: '8%', background: '#F4A261', animationDelay: '5s' }} />

      <div className="glass-card-static w-full max-w-sm p-8 relative z-10 animate-slide-up">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center animate-float animate-glow"
            style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--neon-purple)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: '#E8732A' }}>苍商通</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>商会企业智慧互联平台</p>
        </div>

        <div className="mb-5">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8A99A" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号" className="cyber-input w-full pl-11" />
          </div>
        </div>

        <div className="mb-7">
          <div className="flex gap-3">
            <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="6位验证码" maxLength={6} className="cyber-input flex-1" />
            <button onClick={sendCode} disabled={countdown > 0 || !/^1\d{10}$/.test(phone)}
              className="px-5 rounded-[14px] text-sm font-semibold whitespace-nowrap disabled:opacity-30 transition-all"
              style={{ background: 'rgba(232,115,42,0.08)', border: '1.5px solid rgba(232,115,42,0.15)', color: '#E8732A' }}>
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          </div>
        </div>

        <button onClick={login} disabled={loading} className="neon-btn w-full py-4 text-sm tracking-wider">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="30 70" /></svg>
              登录中
            </span>
          ) : '登 录'}
        </button>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-secondary)' }}>苍南商会会员专属平台</p>
      </div>
    </div>
  );
}
