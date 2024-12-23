// import { Request, Response } from "express";
import { httpMethod } from "..";
// import { SECRET } from "../../../config/app";
// import Session from "../../../models/Session";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { validateRegisterRequest } from "./validator";
// import jwt from "jsonwebtoken"
// import About from "../../../models/About";


export const register = httpMethod(async (req, res): Promise<any> => {
    const reqData = await validateRegisterRequest(req);
    const existingUser = await User.findOne({ email: reqData.email });
    if (existingUser) {
        throw {
            status: 400,
            message: "Email Already Exists!",
        };
    }

    const hashedPassword = await bcrypt.hash(reqData.password, 10);
    const user = await User.create({ ...reqData, password: hashedPassword });
    // await About.create({ userId: user._id, preferredGender: req.body.preferredGender, gender: req.body.gender })
    res.status(201).json({ user: { username: user.username, email: user.email }, message: "Signed Up Successfully !" })
})

// export const login = httpMethod(async (req, res) => {
//     const reqData = await validateLoginRequest(req);
//     const existingUser = await User.findOne({ email: reqData.email });

//     if (!existingUser) {
//         throw {
//             status: 400,
//             message: "User not Found!",
//         };

//     }
//     const matchPassword = await bcrypt.compare(reqData.password, existingUser.password)

//     if (!matchPassword) {
//         throw {
//             status: 400,
//             message: "Invalid Credentials !",
//         };
//     }

//     const user = {
//         _id: existingUser._id,
//         email: existingUser.email,
//         phone: existingUser.phone,
//         name: existingUser.name,
//         // gender: existingUser.gender,
//         dob: existingUser.dob,
//         role: existingUser.role,
//         // Add other properties you need
//     };

//     const session = await createSession(existingUser)
//     const userAbout = await About.findOne({ userId: existingUser._id })
//     res.status(200).json({ user: { ...user, about: userAbout || {} }, token: session.accessToken, expiresAt: session.expiresAt, message: "Successfully LoggedIn!" })
// })

// export const changePassword = httpMethod(async (req, res) => {

//     const { email, password } = req.body
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const existingUser = await User.findOneAndUpdate({ email: email }, {
//         $set: {
//             password: hashedPassword
//         },
//     }, { new: true });

//     if (!existingUser) {
//         throw {
//             status: 400,
//             message: "User not Found!",
//         };
//     }
//     res.status(200).json({ user: existingUser, message: "Password Changed Successfully!" })
// })

// // update the current accessToken's time  again to which its ideally is
// export const refreshToken = httpMethod(async (req: Request, res: Response) => {

// })

// // remove the current session from db
// export const logout = httpMethod(async (req: Request, res: Response) => {

// })
// const createSession = async (user: any) => {
//     const expiresAt = new Date();
//     expiresAt.setHours(expiresAt.getHours() + 1);
//     const newSession = await new Session({
//         userId: user._id,
//         expiresAt: expiresAt
//     }).save();
//     const token = jwt.sign({ email: user.email, userId: user._id, sessionId: newSession._id }, SECRET);
//     newSession.accessToken = token;
//     return newSession.save()
// }