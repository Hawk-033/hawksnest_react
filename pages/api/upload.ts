import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect();
apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const file = req.file;
  res.status(200).json({ file });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};