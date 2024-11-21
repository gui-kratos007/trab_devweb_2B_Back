import { Router } from "express";

import PostController from "../controllers/PostController";

const PostRouter = Router();

// Listar posts
PostRouter.get("/posts", PostController.listPost);

// Inserir posts
PostRouter.post("/post/create", PostController.createPost);

// Editar posts
PostRouter.put("/post/edit/:id", PostController.updatePost);

// Deletar posts
PostRouter.delete("/post/delete/:id", PostController.deletePost);

export default PostRouter;