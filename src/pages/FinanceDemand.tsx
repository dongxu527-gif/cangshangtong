import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function FinanceDemand() {
  const [form, setForm] = useState({ amount: '', purpose: '', term: '', company: '', contact: '' });
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.amount || !form.purpose) return alert('请填写融资金额和用途');
    try { await client.post('/finance/demand', form); } catch {}
    alert('融资需求已发布！');
    navigate('/finance');
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="text-primary text-sm mb-3">← 返回</button>
      <h1 className="text-xl font-bold text-primary mb-4">发布融资需求</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">融资金额(万元)</label>
          <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="如：100" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">融资用途</label>
          <textarea value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} placeholder="请描述融资用途..." rows={3} className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">期望期限</label>
          <select value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} className="w-full border rounded-lg px-3 py-2.5 text-sm">
            <option value="">请选择</option>
            <option>6个月</option><option>1年</option><option>2年</option><option>3年</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">企业名称</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="请输入企业名称" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">联系方式</label>
          <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="手机号" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <button onClick={submit} className="w-full bg-primary text-white py-3 rounded-lg font-bold">提交需求</button>
      </div>
    </div>
  );
}
