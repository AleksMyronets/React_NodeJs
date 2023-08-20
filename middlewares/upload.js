import multer from 'multer';
import path from 'path';

const dest = path.resolve('tmp');

const config = multer.diskStorage({
  destination: dest,
});

export const upload = multer({ storage: config });
