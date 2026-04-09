import type { VercelRequest, VercelResponse } from '@vercel/node';

const items = [
  { id: '1', name: '商会贷', bank: '中原银行', rate: '3.85%', amount: '最高500万', term: '1-3年', green: true },
  { id: '2', name: '商户经营贷', bank: '郑州银行', rate: '4.35%', amount: '最高200万', term: '6个月-2年', green: false },
  { id: '3', name: '科创信用贷', bank: '工商银行', rate: '3.65%', amount: '最高300万', term: '1-5年', green: true },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.json({ items });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
