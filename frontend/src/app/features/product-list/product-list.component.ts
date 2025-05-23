import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductResponse } from '../../types/product.type';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule,MatIconModule,FormsModule,MatButtonModule]
})
export class ProductListComponent {
  products: Product[] = [];
  product: Product | null = null; 
  modalOpen: boolean = false;
  searchText = ""
  filterProducts: any[] = []
  countCart: string = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  public currentPage = 1;
  public productsPerPage = 10;
  public totalPages = 0;
  private router = inject(Router);

  private getProducts() {
    this.productService.getProducts(this.currentPage, this.productsPerPage).subscribe((products: ProductResponse) => {
      this.products = products.data;
      this.totalPages = this.getTotalPages(products.total);
      this.filterProducts = this.products;
    });
  }

  ngOnInit() {
    this.getProducts()
    this.countingCart()
  }

  applyFilter(){
    const text = this.searchText.trim().toLocaleLowerCase()
    this.filterProducts = this.products.filter((product)=> 
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text) ||
      product.price.toString().includes(text) ||
      product.details.toLowerCase().includes(text)
    )
  }

  private getTotalPages(total: number) {
    return Math.ceil(total / this.productsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts()
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts()
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id)
    this.countingCart()
  }

  viewCart() {
    this.router.navigate(['/cart'])
  }

  countingCart() {
    const count = this.cartService.getCartCount()
    this.countCart = count === 0 ? '' : count.toString()
  }

  viewDetails(product: Product): void {
    this.product = product; 
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false; 
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
