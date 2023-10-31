import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto';
import { JWT_SECRET } from '../config';


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
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' })

}

export const ValidateSignature = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}