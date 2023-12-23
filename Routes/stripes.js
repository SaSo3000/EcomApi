const router = require("express").Router();

const stripe = require("stripe")("sk_test_51OKqQQAXlePHnPftjdDRY7MCfIBxHKKfwRh8BvdowkzO4YbsAANyqRAKGbtM6tUZAiE24qYamxzveET5HzrTUE3700d4juqVgr")

router.post("/payment",(req,res)=>{
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency:"cad",
        },
        (stripeErr, stripeRes)=>{
            if(stripeErr){
                res.status(500).json(stripeErr);
            }
            else{
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;