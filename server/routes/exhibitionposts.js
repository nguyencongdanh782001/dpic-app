import express from "express";
import {
  getExhposts,
  getPrivateExhposts,
  createExhposts,
  updateExhposts,
  likeExhpost,
  commentExhpost,
  deleteExhposts,
} from "../controllers/exhibitionposts.js";
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

router.get("/", getExhposts);
router.get("/private", verifyToken, getPrivateExhposts);
router.post("/", verifyToken, upload.array('image',2), createExhposts);
router.patch("/:id", verifyToken, updateExhposts);
router.patch("/:id/likepost", verifyToken, likeExhpost);
router.post("/:id/comment", verifyToken, commentExhpost);
router.delete("/:id", verifyToken, deleteExhposts);

export default router;
