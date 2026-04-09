import type { VercelRequest, VercelResponse } from '@vercel/node';

const items = [
  { id: '1', title: '钢材供应 — 批量优惠', type: '供应', tags: ['建材', '钢材'], match: 92, location: '郑州', time: '2小时前', summary: '大量现货钢材，规格齐全，价格优惠，支持定制。可提供材质报告，欢迎来电洽谈。' },
  { id: '2', title: '急需包装材料供应商', type: '需求', tags: ['包装', '印刷'], match: 78, location: '洛阳', time: '5小时前', summary: '食品级包装材料，月需10万套，要求QS认证，长期合作优先。' },
  { id: '3', title: '办公家具清仓处理', type: '供应', tags: ['家具', '办公'], match: 85, location: '郑州', time: '1天前', summary: '公司搬迁，办公桌椅、文件柜等低价处理，九成新，可看货。' },
  { id: '4', title: '寻找物流合作伙伴', type: '需求', tags: ['物流', '运输'], match: 71, location: '开封', time: '2天前', summary: '需要河南省内物流配送服务，日均发货200单，寻求稳定合作。' },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.json({ items });
  }
  if (req.method === 'POST') {
    return res.json({ ok: true, id: String(Date.now()) });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
