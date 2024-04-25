import { catchAsyncHandler } from "../middlewares/catchAsyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncHandler(async (req, res , next)=>{
    const {firstName, lastName, email, phone , message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    await Message.create({firstName , lastName , email , phone, message});

    return res.status(200).json({
        success:true,
        message:"Message Send Successfully"
    });
});