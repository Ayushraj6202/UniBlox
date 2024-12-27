import Order from "../models/Order.js";
import Discount from "../models/Discount.js";

const getStatics = async (req,res)=>{
    try {
        const orders = await Order.find();
        // console.log("stats ",orders);
        
        let totalItems = 0,discountedAmount = 0, totalPurchase = 0;
        for(const x of orders){
            totalItems += x.items.length;
            discountedAmount += x.discountAmount;
            totalPurchase += x.total; 
        }
        const discountCode = await Discount.find({isActive:false}).select('code');
        // console.log("statics ",totalItems,totalPurchase,discountedAmount,discountCode);
        return res.status(200).json({
            totalItems,
            discountedAmount,
            discountCode,
            totalPurchase
        });
        
    } catch (error) {
        return res.status(500).json({"msg":"Internal server error"});
    }
}
export default getStatics;