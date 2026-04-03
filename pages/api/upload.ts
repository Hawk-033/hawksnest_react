import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const upload = multer({ dest: 'uploads/' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};