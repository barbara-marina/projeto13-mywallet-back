import signUpSchema from "../schemas/signUpSchema.js"

export default function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body);
    if (validation.error) return res.status(422).send("Improper format.");
    
    next();
}