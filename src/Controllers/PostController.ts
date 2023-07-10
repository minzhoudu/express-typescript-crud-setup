import { Request, Response } from "express";
import { Post } from "../Models/PostsModel";
import { User } from "../Models/UserModel";

interface PostBody {
    title: string;
    content: string;
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const allPosts = await Post.find({
            relations: {
                user: true,
            },
            select: {
                user: {
                    name: true,
                    email: true,
                    id: true,
                },
            },
        });

        res.status(200).json({
            status: "success",
            posts: allPosts,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content } = <PostBody>req.body;

        if (!title || !content) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide title and content",
            });
        }

        const user = await User.findOneBy({ email: req.user.email });
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "You are not logged in!",
            });
        }

        const newPost = new Post();
        newPost.title = title;
        newPost.content = content;
        newPost.user = user;
        await newPost.save();

        res.status(201).json({ status: "success", message: "Post created" });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
