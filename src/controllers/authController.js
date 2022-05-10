import db from "../db.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export async function signUp(req, res) {
    const user = req.body;
    
    try{
        const passwordHash = bcrypt.hashSync(user.password, 10);
        await db.collection("users").insertOne({...user, password: passwordHash});
        const userData = await db.collection("users").findOne({email: user.email});
        if (!userData) return res.sendStatus(401);
        await db.collection("transactions").insertOne({
            userId: userData._id, 
            userAmount: 0,
            userTransactions: []
        });
        res.status(202).send("New user created successfully.");
    } catch(e) {
        return res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const user = req.body;
    try {
        const userData = await db.collection("users").findOne({email: user.email});

        if (userData && bcrypt.compareSync(user.password, userData.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({token, userId: userData._id});
            return res.send(token);
        }
        res.status(401).send("Unauthorized! Email or password is incorrect.");
    } catch(e) {
        res.sendStatus(500);
    }
}

export async function logOut(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    try {
        await db.collection("sessions").deleteOne({token});

        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(500);
    }
}