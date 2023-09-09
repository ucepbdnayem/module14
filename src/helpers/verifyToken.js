import { jwtVerify } from "jose";

export async function verifyToken(token){
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
        const decoded = await jwtVerify(token,secret);
        //console.log(decoded['payload']);
        
        return decoded['payload'];
    } catch (e) {
        return "Token Expired";
    }
}