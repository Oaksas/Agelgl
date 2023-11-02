export interface CreateFoodInput {
    name: string;
    price: number;
    foodType: [string];
    description: string;
    category: string;
    readyTime: number;
    vendorId: string;
}