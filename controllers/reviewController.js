const Product = require("../models/Product");

const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ success: false, message: "Product already reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Review added successfully",
        data: product,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const updateProductReview = async (req,res) =>{
try{
 const { rating ,comment } = req.body;
 const product = await Product.findById(req.params.id);

 if(!product){
   return  res.status(404).json({message : 'Product not found'});
 }

 const review = product.reviews.find((r)=>r.user.toString() === r.user._id.toString());

 if(!review){
   return res.status(404).json({success : false, message : 'Review not found'});
 }

 if(rating) review.rating = Number(rating);
 if(comment) review.comment = comment;
 
 product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({ success: true, message: 'Review updated successfully', data: product });


}catch(error){
   res.status(500).json({success : false,messsage : 'Internal  server Error',error : error.message});
}

}  

const deleteProductReview = async (req,res) =>{
  try{
   const product = await Product.findById(req.params.id);
   
   if(!product){
     return res.status(404).json({success : false,message : 'Product not  found'});
   }

    const initialLength = product.reviews.length;

    product.reviews = product.reviews.filter(
      (r) => r.user.toString() !== req.user._id.toString()
    );

    if (product.reviews.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    product.numReviews = product.reviews.length;

    if (product.reviews.length > 0) {
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    } else {
      product.rating = 0;
    }

    await product.save();
    res.status(200).json({ success: true, message: 'Review deleted successfully', data: product });

  }catch(error){
   res.status(500).json({success : false,message : 'Internal  server error',error : error.message});
  }

}

module.exports = { addProductReview ,updateProductReview,deleteProductReview};
