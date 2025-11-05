import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { analyzeImage, compareImages, downloadReport } from "../controllers/imageController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload to backend/uploads
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

// ✅ Single image analyze
router.post("/analyze", upload.single("image"), analyzeImage);

// ✅ Compare two images
router.post("/compare", upload.array("images", 2), compareImages);

// ✅ Report download
router.post("/report", upload.single("image"), downloadReport);

export default router;
