import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function RadarPost() {
  const [form, setForm] = useState({ title: '', type: '需求', industry: '', region: '', content: '', contact: '' });
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.title || !form.content) return alert('请填写标题和内容');
    try {
      await client.post('/radar', form);
    } catch {}
    alert('发布成功！');
    navigate('/radar');
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="text-primary text-sm mb-3">← 返回</button>
      <h1 className="text-xl font-bold text-primary mb-4">发布供需信息</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">类型</label>
          <div className="flex gap-2">
            {['需求', '供应'].map((t) => (
              <button
                key={t}
                onClick={() => setForm({ ...form, type: t })}
                className={`px-6 py-2 rounded-lg text-sm ${form.type === t ? 'bg-primary text-white' : 'bg-white border text-gray-600'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">标题</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="请输入标题" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-1 block">行业</label>
            <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="如：制造业" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-1 block">地区</label>
            <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} placeholder="如：郑州" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">详细描述</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="请描述您的需求或供应详情..." rows={5} className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">联系方式</label>
          <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="手机号或微信号" className="w-full border rounded-lg px-3 py-2.5 text-sm" />
        </div>

        <button onClick={submit} className="w-full bg-primary text-white py-3 rounded-lg font-bold">发布</button>
      </div>
    </div>
  );
}
