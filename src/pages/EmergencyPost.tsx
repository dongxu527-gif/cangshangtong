import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function EmergencyPost() {
  const [form, setForm] = useState({ title: '', level: '紧急', content: '', location: '', contact: '' });
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.title || !form.content) return alert('请填写标题和内容');
    try { await client.post('/emergency', form); } catch {}
    alert('应急信息已发布！');
    navigate('/emergency');
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="text-primary text-sm mb-3">← 返回</button>
      <h1 className="text-xl font-bold text-accent mb-4">发布应急信息</h1>

      <div className="bg-red-50 rounded-xl p-3 mb-4 text-sm text-accent">
        ⚠️ 应急频道用于紧急求助，请确保信息真实有效
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">紧急程度</label>
          <div className="flex gap-2">
            {['紧急', '特急'].map((l) => (
              <button
                key={l}
                onClick={() => setForm({ ...form, level: l })}
                className={`px-6 py-2 rounded-lg text-sm ${form.level === l ? 'bg-accent text-white' : 'bg-white border text-gray-600'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">标题</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="简要描述紧急情况" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">详细描述</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="请详细描述您遇到的紧急情况..." rows={4} className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">所在地区</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="如：郑州高新区" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">联系方式</label>
          <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="手机号" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <button onClick={submit} className="w-full bg-accent text-white py-3 rounded-lg font-bold">立即发布</button>
      </div>
    </div>
  );
}
