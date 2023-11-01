import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto';
import { JWT_SECRET } from '../config';
import { AuthPayload } from '../dto/Auth.dto';
import { Request } from 'express';


export const GenerateHash = async () => {
    return await bcrypt.genSalt()
}

export const GenerateHashedPassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (password: string, salt: string, savedPassword: string) => {
    return await GenerateHashedPassword(password, salt) === savedPassword
}

export const GenerateSignature = (payload: VendorPayload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })

}

export const ValidateSignature = async (req: Request) => {
    const signature = req.get('Authorization') || ''
    try {
        if (signature) {
            const payload = await jwt.verify(signature.split(' ')[1], JWT_SECRET) as AuthPayload

            req.user = payload
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }


}