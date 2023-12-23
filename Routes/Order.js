const order = require("../models/Order");
const { verifyTokenandAuthorization, verifyTokenandAdmin, verifyToken } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, async (req,res)=>{
const newOrder = new order(req.body);

try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
}
catch(err){
    res.status(500).json(err);
}
});

router.put("/:id", verifyTokenandAdmin, async (req,res)=>{


    try{

        const updatedOrder = await product.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new:true});

        res.status(201).json(updatedOrder);
    }
    catch(err)
    {
        res.status(500).json(err)
    }
});

router.delete("/:id", verifyTokenandAdmin, async(req,res)=>{
    try{
        await order.findByIdAndDelete(req.params.id);
        res.status(201).json("Product has been deleted...");
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get("/find/:id",verifyTokenandAuthorization, async(req,res)=>{
    try{
      const Order = await order.find({id : req.params.id});
      res.status(200).json(Order);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get("/", verifyTokenandAdmin, async(req, res)=>{
    try{
        const Orders = await Order.find();
        res.status(200).json(Carts);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get("/income", verifyTokenandAdmin, async (req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    
    try{
        const income = await order.aggregate([
            { $match: { createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales:"$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"},
                },
            },
        ]);
        res.status(200).json(income);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;