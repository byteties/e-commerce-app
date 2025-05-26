import { Types } from 'mongoose';

export interface Product {
    _id: Types.ObjectId;
    name: string;
    price: number;
    image: string;
    details: string;
    category: string;
}