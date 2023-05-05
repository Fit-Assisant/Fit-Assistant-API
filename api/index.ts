import express from "express";
import categories from "./routes/categories";
import exercices from "./routes/exercices";
import programs from "./routes/programs";
import user from "./routes/user";
const router = express.Router();
router.use("/categories", categories);
router.use("/exercices", exercices);
router.use("/programs", programs);
router.use("/user", user);

export default router;
