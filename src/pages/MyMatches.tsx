import { Link } from 'react-router-dom';

const mockMatches = [
  { id: '1', title: '提供五金配件批发', match: 92, company: '郑州XX五金有限公司', time: '1小时前' },
  { id: '2', title: '物流运输服务合作', match: 85, company: '洛阳顺达物流', time: '3小时前' },
  { id: '3', title: '办公家具直供', match: 78, company: '开封美家家具', time: '1天前' },
];

export default function MyMatches() {
  return (
    <div className="p-4">
      <Link to="/profile" className="text-primary text-sm mb-3 inline-block">← 返回</Link>
      <h1 className="text-xl font-bold text-primary mb-4">我的匹配</h1>

      <div className="space-y-3">
        {mockMatches.map((m) => (
          <div key={m.id} className="bg-white rounded-xl p-4">
            <h3 className="font-bold text-sm mb-1">{m.title}</h3>
            <p className="text-xs text-gray-400 mb-2">{m.company} · {m.time}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-secondary">匹配度 {m.match}%</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${m.match}%` }} />
              </div>
            </div>
            <button className="mt-2 w-full bg-primary text-white py-2 rounded-lg text-sm">立即对接</button>
          </div>
        ))}
      </div>
    </div>
  );
}
