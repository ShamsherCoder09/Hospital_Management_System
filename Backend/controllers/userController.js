import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncHandler(async (req, res, next)=>{
    const {firstName, lastName, email, phone, nic , dob , gender, password, role}=req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password){
        return next (new ErrorHandler("Please fill full Form!", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("User already Registered!" ,400));
    }

    const user = await User.create({
        firstName , lastName, email, phone , nic, dob, gender, password,
        role:"Patient"
    });
    // console.log("user" + user);
    generateToken(user, "User Registered!", 200, res);
    // res.status(200).json({
    //     success:true,
    //     message:"User Registered Successfully"
    // })
});

export const login = catchAsyncHandler(async(req, res, next)=>{
    const {email , password , confirmPassword ,role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if(password !== confirmPassword){
        return next( new ErrorHandler("Password & Confirm Password Do Not Match!",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler(` Invalid Email or Password!`, 400));
    }
    if(role !== user.role){
        return next(new ErrorHandler(" User Not Found With This Role!", 400));
    }
    generateToken(user, "Login SuccessFully!", 201, res);
});

export const addNewAdmin = catchAsyncHandler(async (req, res, next)=>{
    const {firstName, lastName, email, phone , nic , dob , gender , password} = req.body;

    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password){
        return next (new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({email});

    if(isRegistered){
        return next(new ErrorHandler("Admin With This Email Already Exists!",400));
    }

    const admin = await User.create({
        firstName, lastName, email , phone , nic , dob , gender, password, role:"Admin",
    });

    res.status(200).json({
        success:true,
        message:"New Admin Registered",
        admin
    });
});

// Add New Doctors



// Get All Doctors
export const getAllDoctors = catchAsyncHandler(async(req, res, next)=>{
    const doctors = await User.find({role:"Doctor"})
    res.status(200).json({
        success:true,
        doctors
    });
});

// Get All Users
export const getUserDetails = catchAsyncHandler(async(req, res , next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
});

// Logout Admin 
export const logoutAdmin = catchAsyncHandler(async(req, res, next)=>{
    res.status(200).cookie("adminToken", "", {
        httpOnly:true,
        expires: new Date(Date.now())
    })
    .json({
        success:true,
        message:"Admin LogOut SuccessFully"
    });
});

// Logout Patient
export const logoutPatient = catchAsyncHandler(async(req, res, next)=>{
    res.status(200).cookie("patientAdmin", "", {
        httpOnly:true,
        expires: new Date(Date.now())
    })
    .json({
        success:true,
        message:"Patient LogOut SuccessFully"
    });
});

