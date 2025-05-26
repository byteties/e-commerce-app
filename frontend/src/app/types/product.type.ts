export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    details: string;
    category: string;
}

export interface ProductResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
}