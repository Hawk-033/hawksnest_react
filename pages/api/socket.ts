import { Server } from 'socket.io';
import pool from '../../lib/db';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('sendMessage', async (message) => {
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