import db from "./../db.js";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

export async function getUser(req, res) {
    const {user} = res.locals;
    const transactionsData = await db.collection("transactions").findOne({userId: user._id});

    const newFormattedUser = {...user, amount: transactionsData.userAmount, transactions: transactionsData.userTransactions};
    delete newFormattedUser.password;
    res.send(newFormattedUser);
}

export async function createNewTransaction(req, res) {
    const {user} = res.locals;
    let newTransaction = req.body;
    
    try {
        const transactionsData = await db.collection("transactions").findOne({userId: user._id});
        if (!transactionsData)  return res.sendStatus(401);

        let userAmount = parseFloat(transactionsData.userAmount);

        if (newTransaction.type === "in") {
            userAmount = userAmount + parseFloat(newTransaction.amount);
        }
        if (newTransaction.type === "out") {
            userAmount = userAmount - parseFloat(newTransaction.amount);
        }

        newTransaction = {...newTransaction, id: uuid(), createAt: dayjs().format("DD/MM")};

        await db.collection("transactions").updateOne(
            {userId: user._id},
            {$set :{userAmount}, $push: {userTransactions: newTransaction}}
        );

        res.status(201).send("New transaction executed.");
    } catch(e) {
        return res.sendStatus(500);
    }
}