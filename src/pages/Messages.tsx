import { Link } from 'react-router-dom';

const mockMessages = [
  { id: '1', title: '您的供需信息有新回复', content: '郑州XX五金有限公司对您的需求感兴趣', time: '30分钟前', read: false },
  { id: '2', title: '匹配提醒', content: '系统为您匹配到3条新的供需信息', time: '2小时前', read: false },
  { id: '3', title: '政策更新通知', content: '河南省中小企业专项资金申报已开始', time: '1天前', read: true },
  { id: '4', title: '应急响应确认', content: '您的应急信息已有2人响应', time: '2天前', read: true },
];

export default function Messages() {
  return (
    <div className="p-4">
      <Link to="/profile" className="text-primary text-sm mb-3 inline-block">← 返回</Link>
      <h1 className="text-xl font-bold text-primary mb-4">消息通知</h1>

      <div className="space-y-3">
        {mockMessages.map((m) => (
          <div key={m.id} className={`bg-white rounded-xl p-4 ${!m.read ? 'border-l-4 border-primary' : ''}`}>
            <div className="flex justify-between items-start mb-1">
              <h3 className={`text-sm ${!m.read ? 'font-bold' : 'text-gray-700'}`}>{m.title}</h3>
              {!m.read && <span className="w-2 h-2 bg-accent rounded-full" />}
            </div>
            <p className="text-xs text-gray-500">{m.content}</p>
            <p className="text-xs text-gray-400 mt-1">{m.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
