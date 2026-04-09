import { Link } from 'react-router-dom';

const mockPosts = [
  { id: '1', title: '急寻五金配件供应商', type: '需求', status: '已发布', time: '2小时前', replies: 3 },
  { id: '2', title: '提供物流运输服务', type: '供应', status: '已发布', time: '1天前', replies: 5 },
  { id: '3', title: '求购办公家具', type: '需求', status: '已匹配', time: '3天前', replies: 8 },
];

export default function MyPosts() {
  return (
    <div className="p-4">
      <Link to="/profile" className="text-primary text-sm mb-3 inline-block">← 返回</Link>
      <h1 className="text-xl font-bold text-primary mb-4">我的发布</h1>

      <div className="space-y-3">
        {mockPosts.map((p) => (
          <Link key={p.id} to={`/radar/${p.id}`} className="bg-white rounded-xl p-4 block">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-sm">{p.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded ${p.status === '已匹配' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{p.status}</span>
            </div>
            <div className="text-xs text-gray-400">{p.type} · {p.time} · {p.replies}条回复</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
