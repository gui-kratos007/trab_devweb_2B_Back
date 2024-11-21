import { Router } from "express";

import CommentController from "../controllers/CommentController";

const CommentRouter = Router();

// Listar comentários
CommentRouter.get("/comments", CommentController.listComment);

// Criar comentários
CommentRouter.post("/comment/create", CommentController.createComment);

// Editar comentários
CommentRouter.put("/comment/edit/:id", CommentController.updateComment);

// Deletar comentários
CommentRouter.delete("/comment/delete/:id", CommentController.deleteComment);

export default CommentRouter;