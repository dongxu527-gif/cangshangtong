import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock data for demo
const mockUser = { id: '1', name: '张伟', company: '郑州苍南商会', level: '副会长', phone: '13800000001' };

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  
  if (method === 'POST' && req.url?.includes('/login')) {
    return res.json({ token: 'demo-jwt-token', user: mockUser });
  }
  
  if (method === 'POST' && req.url?.includes('/sms')) {
    return res.json({ ok: true });
  }
  
  if (method === 'GET' && req.url?.includes('/profile')) {
    return res.json(mockUser);
  }

  return res.status(404).json({ error: 'Not found' });
}
