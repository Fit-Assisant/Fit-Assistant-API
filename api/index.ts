import express from "express";
import exercices from "./routes/exercices";
const router = express.Router();
router.use("/exercices", exercices);
export default router;
