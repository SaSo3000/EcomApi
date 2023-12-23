const product = require("../models/Product")
const { verifyTokenandAuthorization, verifyTokenandAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenandAdmin, async (req,res)=>{
const newProduct = new product(req.body);

try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
}
catch(err){
    res.status(500).json(err);
}
});

router.put("/:id", verifyTokenandAdmin, async (req,res)=>{


    try{

        const updatedProduct = await product.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new:true});

        res.status(201).json(updatedProduct);
    }
    catch(err)
    {
        res.status(500).json(err)
    }
});

router.delete("/:id", verifyTokenandAdmin, async(req,res)=>{
    try{
        await product.findByIdAndDelete(req.params.id);
        res.status(201).json("Product has been deleted...");
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get("/find/:id", async(req,res)=>{
    try{
      const Product = await product.findById(req.params.id);

      res.status(200).json(Product);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get("/", async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;
        if(qNew){
            products = await product.find().sort({createdAt:-1}).limit(1)
        }
        else if(qCategory){
            products = await product.find({categories:{$in:[qCategory],},})
        }
        else{
            products = await product.find();
        }
      res.status(200).json(products);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;