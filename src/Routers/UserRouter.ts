import { Router } from "express";

import { Register, Login, getAllUsers } from "../Controllers/UserController";
import { authentication, authorization } from "../Middleware/AuthMiddleware";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);

router.route("/api/v1/users").get(authentication, authorization("admin"), getAllUsers);

export default router;
