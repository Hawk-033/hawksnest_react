import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.NEXTAUTH_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}