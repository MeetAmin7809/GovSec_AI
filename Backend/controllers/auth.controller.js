const jwt = require("jsonwebtoken");
const response = require("../utils/responseHandler.util.js");
const {sendOtp} = require("../utils/emailHelper.js");


const User = require("../models/user.model.js");

class AuthController {
	static async register(req, res) {
        console.log(req.body)
		const { firstname, lastname, email, password, phonenumber, city, state } = req.body;
		if(!firstname || !lastname|| !email|| !password|| !phonenumber|| !city|| !state){
			return response(res, 400, null, "Invalid Fields");
		}
		const user = await User.findOne({ email: email });
		if (user) {
			return response(res, 400, null, "User already existed");
		}

		const otp=Math.floor(1000+Math.random()*9000)
		const optExpire=new Date(Date.now() + 5*60*1000)

		const newuser = new User({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password,
			phonenumber: phonenumber,
			city: city,
			state: state,
			otp: otp,
			otpExpire : optExpire
		});
        await newuser.save()

		await sendOtp(email,otp)

        return response(res, 200, null, "User created sucessfully");
	}

	static async verfiyUser(req,res){
		const {email,otp}=req.body
		if(!email||!otp){
			return response(res, 400, null, "Not found email || Otp");
		}
		const user=await User.findOne({email})


		if(!user){
			return response(res, 404, null, "User Not Found ")
		}

	    const currentTime =new Date(Date.now())
		if(currentTime>user.otpExpire){
			return response(res,400,null,"Otp Expire")
		}
		// console.log(user.otp)
		// console.log(otp)
		// console.log(parseInt(user.otp))
		// console.log(parseInt(otp))
		if(parseInt(user.otp) !== parseInt(otp) ){
			return response(res,400,null,"Fake Otp")
		}

		user.isVerified =true;
		user.otp = null;
		user.otpExpire = null;

		await user.save()

		return response(res,200,user,"User verfied Successfully")
	}

	static async login(req, res) {}

	static async logout(req, res) {}
}

module.exports = AuthController;
