import express from "express";
import exercices from "./routes/exercices";
import programs from "./routes/programs";
import user from "./routes/user";
const router = express.Router();
router.use("/exercices", exercices);
router.use("/programs", programs);
router.use("/user", user);
export default router;
