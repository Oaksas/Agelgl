export interface CreateVendorDto {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    serviceAvailable: boolean;
}

export interface VendroLoginInputs {
    email: string;
    password: string;
}

export interface VendorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];

}

export interface EditVendorProfile {
    name: string;
    address: string;
    foodTypes: [string];
    phone: string;

}