import { plainToClass } from 'class-transformer';
import express, { Request, Response } from 'express';
import { CreateCustomerInputs, CustomerLoginInputs, CustomerUpdateInputs } from '../dto';
import { validate } from 'class-validator';
import { Customer } from '../models/Customer';
import { GenerateHash, GenerateHashedPassword, GenerateOtp, GenerateSignature, ValidatePassword, onRequestOtp } from '../utils';


export const CustomerSignUp = async (req: Request, res: Response) => {
    try {

        const credentials = plainToClass(CreateCustomerInputs, req.body);
        const inputErrors = await validate(credentials, { validationError: { target: false } });

        if (inputErrors.length) {
            return res.status(400).json({
                "message": "Invalid inputs",
                "errors": inputErrors
            })
        }


        const { email, password, phone } = credentials

        const salt = await GenerateHash()
        const hashedPass = await GenerateHashedPassword(password, salt)
        const { otp, otp_expiry } = await GenerateOtp()


        const existingCustomer = await Customer.findOne({ email })
        if (existingCustomer) {
            return res.status(400).json({
                "message": "Customer already exists"
            })
        }

        const customer = await Customer.create({
            email,
            phone,
            password: hashedPass,
            salt,
            otp,
            otp_expiry,
            verified: false
        })

        if (customer) {

            const optResponse = onRequestOtp(otp, phone)

            const signature = await GenerateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            })


            return res.status(201).json({
                "message": "Customer created successfully",
                "data": customer,
                "signature": signature
            })





        }
        return res.status(500).json({
            "message": "Internal server error"
        })



    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const CustomerLogin = async (req: Request, res: Response) => {
    try {


        const loginInputs = plainToClass(CustomerLoginInputs, req.body)
        const loginErrors = await validate(loginInputs, { validationError: { target: false } })

        if (loginErrors.length) {
            return res.status(400).json({
                "message": "Invalid inputs",
                "errors": loginErrors
            })
        }

        const { email, password } = loginInputs
        const customer = await Customer.findOne({ email })

        if (customer) {
            const validatePassword = await ValidatePassword(password, customer.salt, customer.password)
            console.log("Validate password", customer.salt)

            if (validatePassword) {
                const signature = await GenerateSignature({
                    _id: customer._id,
                    email: customer.email,
                    verified: customer.verified
                })
                return res.status(200).json({
                    "message": "Customer logged in successfully",
                    "data": signature
                })
            }

            return res.status(400).json({
                "message": "Invalid credentials"
            })

        }

    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const CustomerVerify = async (req: Request, res: Response) => {
    try {

        const { otp } = req.body
        const customer = req.user

        if (customer) {

            const profile = await Customer.findById(customer._id)
            console.log("Customer", profile)

            if (profile) {
                if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                    profile.verified = true
                    await profile.save()

                    const signature = await GenerateSignature({
                        _id: profile._id,
                        email: profile.email,
                        verified: profile.verified
                    })
                    return res.status(200).json({
                        "message": "Customer verified successfully",
                        "data": signature
                    })
                }
                return res.status(400).json({
                    "message": "Invalid OTP"
                })
            }

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const CustomerForgotPassword = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}

export const CustomerGetOTP = async (req: Request, res: Response) => {
    try {

        const customer = req.user

        if (customer) {
            const profile = await Customer.findById(customer._id)

            if (profile) {
                const { otp, otp_expiry } = await GenerateOtp()
                profile.otp = otp
                profile.otp_expiry = otp_expiry
                await profile.save()
                await onRequestOtp(otp, profile.phone)
                return res.status(200).json({
                    "message": "OTP sent successfully"
                })
            }
        }


        return res.status(400).json({
            "message": "Invalid customer"
        })
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}

export const CustomerGetProfile = async (req: Request, res: Response) => {

    try {
        const customer = req.user

        if (customer) {
            const profile = await Customer.findById(customer._id)
            if (profile) {
                return res.status(200).json({
                    "message": "Profile fetched successfully",
                    "data": profile
                })
            }
        }

        return res.status(400).json({
            "message": "Invalid customer"
        })

    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }


}




export const CustomerUpdateProfile = async (req: Request, res: Response) => {
    try {
        const customer = req.user
        const customerData = plainToClass(CustomerUpdateInputs, req.body)
        const customerErrors = await validate(customerData, { validationError: { target: false } })
        if (customerErrors.length) {
            return res.status(400).json({
                "message": "Invalid inputs",
                "errors": customerErrors
            })
        }

        const { firstName, lastName, address } = customerData

        if (customer) {
            const profile = await Customer.findById(customer._id)
            if (profile) {
                if (firstName) {
                    profile.firstName = firstName
                }
                if (lastName) {
                    profile.lastName = lastName
                }
                if (address) {
                    profile.address = address
                }
                await profile.save()
                return res.status(200).json({
                    "message": "Profile updated successfully",
                    "data": profile
                })
            }
        }
        return res.status(400).json({
            "message": "Invalid customer"
        })



    } catch (error) {

        return res.status(500).json({
            "message": "Internal server error"
        })

    }
}