import { useParams, Link } from 'react-router-dom';

const mockDetail: Record<string, any> = {
  '1': { title: '急寻五金配件供应商', type: '需求', tags: ['五金', '制造业'], match: 92, location: '郑州', time: '2小时前', author: '张经理', company: '郑州XX制造有限公司', content: '本公司急需一批五金配件，要求质量稳定，价格合理，交货期不超过15天。\n\n具体需求：\n- 螺丝螺母类：M6-M12各规格，不锈钢材质\n- 五金冲压件：按图纸加工\n- 表面处理：镀锌/镀铬\n\n要求供应商有相关资质，能提供样品试用。', contact: '138****5678' },
};

export default function RadarDetail() {
  const { id } = useParams();
  const d = mockDetail[id || ''] || { title: '供需信息详情', type: '需求', tags: [], match: 80, location: '郑州', time: '刚刚', author: '用户', company: '公司', content: '详细内容待补充...', contact: '联系信息' };

  return (
    <div className="p-4">
      <Link to="/radar" className="text-primary text-sm mb-3 inline-block">← 返回列表</Link>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-lg font-bold text-gray-800">{d.title}</h1>
          <span className={`text-xs px-2 py-0.5 rounded ${d.type === '供应' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
            {d.type}
          </span>
        </div>
        <div className="flex gap-1 mb-3">
          {d.tags.map((tag: string) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-bold text-secondary">匹配度 {d.match}%</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full" style={{ width: `${d.match}%` }} />
          </div>
        </div>
        <div className="text-xs text-gray-400">{d.location} · {d.time} · {d.author} · {d.company}</div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-800 mb-2">详细内容</h2>
        <p className="text-sm text-gray-600 whitespace-pre-line">{d.content}</p>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h2 className="font-bold text-gray-800 mb-2">联系方式</h2>
        <p className="text-sm text-gray-600">{d.contact}</p>
        <button className="mt-3 w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold">立即对接</button>
      </div>
    </div>
  );
}
