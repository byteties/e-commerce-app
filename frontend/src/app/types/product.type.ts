export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    details: string;
    category: string;
}

export interface ProductResponse {
    subscribe(arg0: (products: ProductResponse) => void): unknown;
    data: Product[];
    total: number;
    page: number;
    limit: number;
}