import products from '../data/products.js';
import Cart from '../models/Cart.js';


const addToCart = async (req,res)=>{
    try {
        const {clientId, productId, quantity } = req.body;
        //search for profuct
        const product = products.find(p => p.productId===productId);
        console.log("product buy ",product);
        if(!product){
            return res.status(400).json({"msg":"Product not found"});
        }
        //check stock for product
        if(product.stock<quantity){
            return res.status(400).json({"msg":"stock is not enough avialable"});
        }
        const cart = await Cart.findOne({clientId});
        if(!cart){
            cart = new Cart({clientId});
        }
        // add product to cart 
        cart.items.push(
            {
                productId: productId,
                price: product.price,
                quantity: quantity,
                name: product.name
            }
        );
        cart.total += quantity*product.price;
        await cart.save({validateBeforeSave:false});
        return res.status(200).json({"msg":"Product added to cart successfully"});
    } catch (error) {
        return res.status(500).json({"msg":"Internal server error"});
    }
}
export default addToCart;