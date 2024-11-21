import { Router } from "express";

import AuthController from "../controllers/AuthController";

const AuthRouter = Router();


// Sign In
AuthRouter.post("/signin", AuthController.SignIn);
AuthRouter.post("/me", AuthController.me);

export default AuthRouter;