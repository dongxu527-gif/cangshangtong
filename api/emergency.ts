import type { VercelRequest, VercelResponse } from '@vercel/node';

const items = [
  { id: '1', title: '紧急！冷库停电，生鲜产品急需转移', level: '特急', location: '郑州中牟', time: '30分钟前', deadline: Date.now() + 2 * 3600000, author: '李明', type: '仓储', phone: '13800138001' },
  { id: '2', title: '供应链断裂，急需替代供应商', level: '紧急', location: '洛阳', time: '2小时前', deadline: Date.now() + 24 * 3600000, author: '王芳', type: '供应链', phone: '13800138002' },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.json({ items });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
