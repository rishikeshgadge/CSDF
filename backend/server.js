import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use the image routes
app.use("/api", imageRoutes);

app.get("/", (req, res) => {
  res.send("✅ Image Forensics Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
