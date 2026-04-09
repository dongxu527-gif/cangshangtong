import { useParams, Link } from 'react-router-dom';

const mockDetail: Record<string, any> = {
  '1': {
    title: '河南省2026年中小企业发展专项资金申报指南', category: '资金补贴', source: '河南省工信厅', deadline: '2026-06-30',
    amount: '最高50万元', target: '中小微企业', conditions: '注册地在河南省，正常经营满2年，无不良信用记录',
    content: '为支持中小企业发展，根据《河南省中小企业促进条例》，现组织开展2026年度中小企业发展专项资金申报工作。\n\n一、支持方向\n1. 技术创新与成果转化\n2. 数字化转型升级\n3. 市场开拓与品牌建设\n\n二、申报条件\n1. 在河南省内注册的中小微企业\n2. 正常经营满2年\n3. 无不良信用记录\n4. 符合国家产业政策\n\n三、申报流程\n在线申报 → 县区初审 → 市级复审 → 省级终审 → 公示 → 拨付',
    analysis: '该政策重点支持技术创新和数字化转型方向，建议商会会员企业重点关注。申报门槛不高，但对项目可行性要求较严。建议提前准备好项目可行性报告和财务报表。'
  },
};

export default function PolicyDetail() {
  const { id } = useParams();
  const d = mockDetail[id || ''] || { title: '政策详情', category: '补贴', source: '政府部门', deadline: '-', amount: '-', target: '-', conditions: '-', content: '政策内容待补充', analysis: '解读待补充' };

  return (
    <div className="p-4">
      <Link to="/policy" className="text-primary text-sm mb-3 inline-block">← 返回列表</Link>

      <h1 className="text-lg font-bold text-gray-800 mb-3">{d.title}</h1>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-primary mb-2">📋 关键信息</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><span className="text-xs text-gray-500">截止日期</span><div className="text-sm font-bold text-accent">{d.deadline}</div></div>
          <div><span className="text-xs text-gray-500">补贴额度</span><div className="text-sm font-bold text-secondary">{d.amount}</div></div>
          <div><span className="text-xs text-gray-500">适用对象</span><div className="text-sm font-bold">{d.target}</div></div>
          <div><span className="text-xs text-gray-500">申报条件</span><div className="text-sm font-bold">{d.conditions}</div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-800 mb-2">政策正文</h2>
        <p className="text-sm text-gray-600 whitespace-pre-line">{d.content}</p>
      </div>

      <div className="bg-orange-50 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-secondary mb-2">💡 商会解读</h2>
        <p className="text-sm text-gray-600">{d.analysis}</p>
      </div>

      <button className="w-full bg-primary text-white py-3 rounded-lg font-bold">我要申报</button>
    </div>
  );
}
