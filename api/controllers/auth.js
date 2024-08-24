import User from "../models/user.js";
import bcrypt  from "bcrypt"

export const register = (req,res,next) => {
    console.log(req.body);
    const {username, email, password} = req.body;

}
export const login = (req,res,next) => {}