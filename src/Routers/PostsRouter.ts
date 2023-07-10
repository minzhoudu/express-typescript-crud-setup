import { Router } from "express";
import { getAllPosts, createPost } from "../Controllers/PostController";
import { authentication, authorization } from "../Middleware/AuthMiddleware";

const router = Router();

router
    .route("/")
    .get(authentication, authorization("admin"), getAllPosts)
    .post(authentication, createPost);

export default router;
