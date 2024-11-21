import { Router } from "express";

import UserController from "../controllers/UserController";

const UserRouter = Router();


// Listar usuários
UserRouter.get("/users", UserController.listUser);

// Inserir usuários
UserRouter.post("/user/create", UserController.createUser);

// Editar usuários
UserRouter.put("/user/edit/:id", UserController.updateUser);

// Deletar usuários
UserRouter.delete("/user/delete/:id", UserController.deleteUser);

export default UserRouter;