

export const GenerateOtp = () => {

    let otp = Math.floor(100000 + Math.random() * 900000);
    let otp_expiry = new Date()
    otp_expiry.setTime(otp_expiry.getTime() + (30 * 60 * 1000))
    return { otp, otp_expiry };
}