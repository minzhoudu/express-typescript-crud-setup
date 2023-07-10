import "dotenv/config";
import * as express from "express";
import * as cookieParser from "cookie-parser";

import { AppDataSource } from "./data-source";
import UserRouter from "./Routers/UserRouter";
import PostRouter from "./Routers/PostsRouter";

AppDataSource.initialize()
    .then(() => {
        console.log("Initialized successfully");
    })
    .catch((error) => console.log(error));

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/user", UserRouter);
app.use("/post", PostRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
