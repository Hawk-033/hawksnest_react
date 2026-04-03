import bcrypt from 'bcrypt';
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hashedPassword]
      );
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}