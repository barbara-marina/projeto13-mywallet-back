import {Router} from "express";
import {signUp, signIn} from "../controllers/authController.js";
import validateSignIn from "../middlewares/signInSchemaValidationMiddleware.js";
import validateSignUp from "../middlewares/signUpSchemaValidationMiddleware.js";
import {validateToken} from "../middlewares/tokenValidationMiddleware.js";
import {logOut} from "./../controllers/authController.js";


const authRouter = Router();

authRouter.post("/sign-up", validateSignUp,signUp);
authRouter.post("/sign-in", validateSignIn, signIn);
authRouter.delete("/log-out", validateToken, logOut)

export default authRouter;