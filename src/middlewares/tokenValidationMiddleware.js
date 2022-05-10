import db from "../db.js";

export async function validateToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.status(401).send("Token not received.");

    try {
        const session = await db.collection("sessions").findOne({token});
        if (!session) return res.status(401).send("This session does not exist.");

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.status(401).send("This user does not exist");

    res.locals.user = user;
    } catch(e) {
        return res.sendStatus(500);
    }

    next();
}