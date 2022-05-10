import { Router } from "express";
import { getUser, createNewTransaction } from "../controllers/userController.js";
import {validateToken} from "../middlewares/tokenValidationMiddleware.js";
import {validateTransaction} from "../middlewares/transactionSchemaValidationMiddleware.js";


const userRouter = Router();

userRouter.get("/user", validateToken, getUser);
userRouter.post("/user/transactions", validateToken ,validateTransaction, createNewTransaction);

export default userRouter;