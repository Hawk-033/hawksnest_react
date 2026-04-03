import multer from 'multer';
import nextConnect from 'next-connect';
import pool from '../../lib/db';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect();
apiRoute.use(upload.single('photo'));

apiRoute.post(async (req, res) => {
  const file = req.file;
  const { originalname, filename, path } = file;

  await pool.query(
    'INSERT INTO photos (original_name, file_name, file_path, created_at) VALUES ($1, $2, $3, NOW())',
    [originalname, filename, path]
  );

  res.status(200).json({ message: 'Photo uploaded successfully' });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};