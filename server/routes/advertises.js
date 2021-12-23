import express from 'express'
import { createAdvertise, deleteAdvertise, getAdvertises, updateAdvertise } from '../controllers/advertises.js'
import verifyToken from '../middleware/auth.js'
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const router = express.Router()

router.get('/', getAdvertises)
router.post('/', verifyToken, upload.array("image", 2), createAdvertise)
router.patch('/:id', verifyToken, updateAdvertise)
router.delete('/:id', verifyToken, deleteAdvertise)

export default router