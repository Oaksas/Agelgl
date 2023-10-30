import bcrypt from 'bcrypt';

export const GenerateHash = async () => {
    return await bcrypt.genSalt()
}

export const GenerateHashedPassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt)
}