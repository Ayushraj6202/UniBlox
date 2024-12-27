import Order from "../models/Order.js";
import Discount from "../models/Discount.js";

const getStatics = async ()=>{
    try {
        const orders = await Order.find();
        let totalItems = 0,discountedAmount = 0, totalPurchase = 0;
        for(x in orders){
            totalItems += x.items.length;
            discountedAmount += x.discountAmount;
            totalPurchase += x.total; 
        }
        const discountCode = await Discount.find().select('code');
        console.log("statics ",totalItems,totalPurchase,discountAmount,discountCode);
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