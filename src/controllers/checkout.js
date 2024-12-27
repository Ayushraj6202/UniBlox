import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Discount from '../models/Discount.js';
import generateDiscountCode from '../utils/generateDiscountCode.js';

const checkout = async (req,res)=>{
    try {
        const {clientId, discountCode } = req.body;
        console.log("check out ",clientId,discountCode);
        if(!clientId){
            return res.status(401).json({"msg":"Who are you"});
        }
        const cart = await Cart.findOne({clientId});
        //check cart
        if(!cart){
            return res.status(400).json({'msg':'Cart is empty'});
        }
        // implement discountCode
        let discountAmount = 0;
        let discountApplied = false;

        const N_Discount = process.env.N_VALUE;
        //check discount code
        if(discountCode){
            const discount = await Discount.findOne({code:discountCode,isActive:true});
            if(discount){
                discountAmount = 0.1 * (cart.total);
                discountApplied = true; 
                discount.isActive = false;
                await discount.save();
            }else{
                return res.status(300).json({"msg":"Discount Code is expired or wrong"});
            }
        }

        //place order
        const newOrder = new Order({
            clientId:clientId,
            items:cart.items,
            total : cart.total - discountAmount,
            discountApplied,
            discountCode,
            discountAmount
        });
        await newOrder.save({validateBeforeSave:false});
        await cart.deleteOne({clientId});

        //generate discount after each n order 
        const totalOrder = await Order.countDocuments();

        if((totalOrder + 1)%N_Discount==0){
            const code = generateDiscountCode();
            const newDiscount = new Discount({
                code,
                isActive:true,
            });
            await newDiscount.save({validateBeforeSave:false});
            return res.status(200).json({
                newOrder,
                msg:`Order placed and a coupon generated ${code}`
            })
        }else{
            res.status(200).json({
                newOrder,
                msg:"Order Placed successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({"msg":"Internal server error"});
    }
}

export default checkout;