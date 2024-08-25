import User from "../models/user.js";
import bcrypt  from "bcrypt"

export const register = async (req,res,next) => {
    // console.log(req.body);
    try {
        const {username, email, password} = req.body;
        const checkUser = await User.findOne({username: username})
        if(checkUser) return res.json({msg :"Username already exists.", status :false })
        const checkEmail = await User.findOne({email:email})
        if(checkEmail) return res.json({msg :"Email already exists." , status :false })
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const user = await User.create({
            username : username,
            email : email,
            password : hash
        })
        // await newUser.save()
        delete user.password;
        return res.json({ msg : "User has been created.", status : true, user })
        // return 
    } catch (err) {
        next(err)
    }
}
export const login = async (req,res,next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user) return res.json({msg : "Incorrect Username and Password.", status : false})
        const passCheck = await bcrypt.compare(password, user.password)
        if(!passCheck) return res.json({msg : "Incorrect Username and Password.", status : false})
        return res.json({msg : "Logged In Sucessfully.", status : true, user })
    } catch (err) {
        next(err)
    }
} 