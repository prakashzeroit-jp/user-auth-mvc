const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity = 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Item add to  cart successfully",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

const viewCart =  async (req,res)=>{
    try{
      const cart =   await Cart.findOne({user : req.user.id}).populate({
        path : 'items.product',
        select : 'name price images stock'
      });

  if(!cart){
    return res.status(200).json({success : true,message : 'cart  is  empty',data :  {items : []}});
  }

  res.status(200).json({success : true,count : cart.items.length,data : cart});

    }catch(error){
   res.status(500).json({success : false,message : 'Ineternal server error',error : error.message});
    }
}


const updateQuantity  = async (req,res)=>{
    try{

   const  { productId, quantity} =  req.body;
   const userId =  req.user.id;

//    if(!quantity < 1){
//       return  res.status(400).json({success : false,message : 'Quentity  cannot be less then 1'});
//    }

  const cart = await  Cart.findOne({user : userId});
  if(!cart){
     return res.status(404).json({success :  false,message : 'Cart not found'});
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if(itemIndex > -1){
     cart.items[itemIndex].quantity = quantity;
     await  cart.save();
 
     const updatedCart = await cart.populate({
        path :  'items.product',
        select :  'name price images stock'
     });

    return res.status(200).json({
        success :  true,
        message :  'Cart updated successfully',
        data :  updatedCart
    });

  }else{
     return  res.status(404).json({success :  false,message : 'Item not found  in  cart'});
  }
    }catch(error){
        res.status(500).json({success :  false,message :  'Internal server error',error : error.message});
    }
}

module.exports = { addToCart,viewCart,updateQuantity };
