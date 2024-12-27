import products from '../data/products.js';
import Cart from '../models/Cart.js';


const addToCart = async (req, res) => {
    try {
        const { clientId, productId, quantity } = req.body;
        // console.log("add to cart ", clientId, productId, quantity);

        //search for profuct
        const product = products.find(p => p.productId === productId);
        // console.log("product buy ", product);
        if (!product) {
            return res.status(400).json({ "msg": "Product not found" });
        }
        //check stock for product
        if (product.stock < quantity) {
            return res.status(400).json({ "msg": "stock is not enough avialable" });
        }
        let cart = await Cart.findOne({ clientId });
        // console.log("cart ", cart);

        if (!cart) {
            cart = new Cart({ clientId });
        }
        // add product to cart 
        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        }
        else {
            cart.items.push(
                {
                    productId: productId,
                    price: product.price,
                    quantity: quantity,
                    name: product.name
                }
            );
        }
        cart.total += quantity * product.price;
        console.log(cart);

        await cart.save({ validateBeforeSave: false });
        return res.status(200).json({ "msg": "Product added to cart successfully" });
    } catch (error) {
        return res.status(500).json({ "msg": "Internal server error" });
    }
}
export default addToCart;