import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'

export const hashString =async(useValue)=>{
    const salt= await bcrypt.genSalt(10);
    const hashedString= await bcrypt.hash(useValue,salt);

    return hashedString;
}

export const compareString= async(text,hashedText)=>{
    return await bcrypt.compare(text,hashedText);
}

export const createJWT=(tokenData)=>{
    return JWT.sign(tokenData,process.env.JWT_SECRET_KEY,{
       expiresIn:60*60*24 
    });
};