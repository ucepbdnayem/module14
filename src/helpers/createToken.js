import { SignJWT } from "jose";

export async function CreateToken(name,email){
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
 
    let token = await new SignJWT({name:name,email: email})
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setIssuer(process.env.NEXT_PUBLIC_JWT_ISSUER)
            .setExpirationTime(process.env.NEXT_PUBLIC_JWT_EXP_TIME)
            .sign(secret);

    return token;
}