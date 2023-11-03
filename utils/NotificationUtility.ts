

export const GenerateOtp = () => {

    let otp = Math.floor(100000 + Math.random() * 900000)
    let otp_expiry = new Date()
    otp_expiry.setTime(otp_expiry.getTime() + (30 * 60 * 1000))
    return { otp, otp_expiry };
}

export const onRequestOtp = async (otp: number, to: string) => {

    const accountSid = ""
    const authtoken = ""
    const client = require('twilio')(accountSid, authtoken);


    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+12058590854',
        to: to
    })

    return response

}