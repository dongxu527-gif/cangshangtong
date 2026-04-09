import type { VercelRequest, VercelResponse } from '@vercel/node';

const items = [
  { id: '1', title: '河南省中小企业数字化转型补贴政策', category: '资金补贴', deadline: '2026-06-30', source: '河南省工信厅', subsidy: '最高50万元', urgent: true },
  { id: '2', title: '高新技术企业所得税优惠', category: '税收优惠', deadline: '2026-12-31', source: '国家税务总局' },
  { id: '3', title: '河南省创新创业大赛项目征集', category: '创新支持', deadline: '2026-05-15', source: '河南省科技厅', subsidy: '最高100万元' },
  { id: '4', title: '专精特新企业认定申报', category: '认定资质', deadline: '2026-08-31', source: '河南省工信厅' },
  { id: '5', title: '郑州市高层次人才引进补贴', category: '人才政策', deadline: '2026-09-30', source: '郑州市人社局', subsidy: '最高200万元' },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.json({ items });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
