import transactionSchema from "../schemas/transactionSchema.js"

export function validateTransaction(req, res, next) {
    const validation = transactionSchema.validate(req.body);
    if (!validation) return res.status(422).send("Improper format.");

    next();
}