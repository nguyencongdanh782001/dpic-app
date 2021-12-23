import express from "express";
import {
  createPhoto,
  getPhotos,
  deletePhoto,
  updatePhoto,
} from "../controllers/photos.js";
import verifyToken from "../middleware/auth.js";
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
const router = express.Router();
router.get("/", verifyToken, getPhotos);
router.post("/", verifyToken, upload.array("image", 2), createPhoto);
router.patch("/:id", verifyToken, updatePhoto);
router.delete("/:id", verifyToken, deletePhoto);

export default router;
