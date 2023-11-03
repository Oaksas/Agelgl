import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerInputs {


    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(10)
    phone: string;

    @IsNotEmpty()
    @Length(7, 20)
    password: string;

}

export interface CustomerPayload {
    _id: string;
    email: string;
    verified: boolean;
}

export class CustomerLoginInputs {


    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(7, 20)
    password: string;

}

export class CustomerUpdateInputs {

    @Length(6, 20)
    firstName: string;

    @Length(6, 20)
    lastName: string;

    @Length(6, 16)
    address: string;


}