import { Router } from "express";
import { signOut, signIn, signUP } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUP)
authRouter.post("/sign-in", signIn)
authRouter.post("/sign-out", signOut)

export default authRouter;