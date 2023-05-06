import express from "express";
import categories from "./routes/categories";
import exercises from "./routes/exercises";
import programs from "./routes/programs";
import muscles from "./routes/muscles";
import user from "./routes/user";
const router = express.Router();
router.use("/categories", categories);
router.use("/exercises", exercises);
router.use("/programs", programs);
router.use("/user", user);
router.use("/muscles", muscles);

export default router;
