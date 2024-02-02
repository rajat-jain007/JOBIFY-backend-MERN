import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);

//authorizePermissions middleware checks is its 'admin'
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
