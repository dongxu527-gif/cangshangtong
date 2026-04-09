import type { VercelRequest, VercelResponse } from '@vercel/node';

const items = [
  { id: '1', title: '河南省中小企业数字化转型补贴政策发布', time: '2026-04-09' },
  { id: '2', title: '郑州市苍南商会2026年春季交流会圆满举办', time: '2026-04-08' },
  { id: '3', title: '商会与中原银行达成战略合作协议', time: '2026-04-07' },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.json({ items });
}
