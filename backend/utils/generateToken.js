import jWt from "jsonwebtoken";

import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId,res) => {
    const token  = jWt.sign({userId}, ENV_VARS.JWT_SECRET,{expiresIn:"15d"});

    res.cookie("jwt-netflix",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in MS
        httpOnly: true,  // xss attacks cross-site scripting attacks, make it not be accessed by js
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV !== "developement",

    });

    return token;
};
