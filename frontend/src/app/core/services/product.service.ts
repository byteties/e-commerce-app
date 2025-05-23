import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product, ProductResponse } from "../../types/product.type";


@Injectable({
    providedIn: 'root'
})
export class ProductService {
   private apiUrl = 'http://localhost:3000/products';

   constructor(
    private http: HttpClient,
) {}

   getProducts(page: number = 0, limit: number = 10) {
    return this.http.get<ProductResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
   }

   getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
   }

   addToCart(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}/cart`, product);
   }
}