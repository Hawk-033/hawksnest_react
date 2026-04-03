import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default function handler(req: NextApiRequest, res: any) {
  if (!(res.socket as any)?.server?.io) {
    const io = new Server((res.socket as any).server);
    (res.socket as any).server.io = io;

    io.on('connection', (socket: any) => {
      socket.on('sendMessage', async (message: { userId: number; content: string }) => {
        const { userId, content } = message;
        await pool.query(
          'INSERT INTO messages (user_id, content, created_at) VALUES ($1, $2, NOW())',
          [userId, content]
        );
        io.emit('receiveMessage', message);
      });
    });
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};