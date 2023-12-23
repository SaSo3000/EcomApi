const cart = require("../models/Cart");
const { verifyTokenandAuthorization, verifyTokenandAdmin, verifyToken } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, async (req,res)=>{
const newCart = new cart(req.body);

try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
}
catch(err){
    res.status(500).json(err);
}
});

router.put("/:id", verifyTokenandAuthorization, async (req,res)=>{


    try{

        const updatedCart = await product.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new:true});

        res.status(201).json(updatedCart);
    }
    catch(err)
    {
        res.status(500).json(err)
    }
});

router.delete("/:id", verifyTokenandAuthorization, async(req,res)=>{
    try{
        await cart.findByIdAndDelete(req.params.id);
        res.status(201).json("Product has been deleted...");
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get("/find/:userId",verifyTokenandAuthorization, async(req,res)=>{
    try{
      const Cart = await cart.findOne({userId : req.params.userId});
      res.status(200).json(Cart);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get("/", verifyTokenandAdmin, async(req, res)=>{
    try{
        const Carts = await cart.find();
        res.status(200).json(Carts);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;