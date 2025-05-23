import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductResponse } from '../../types/product.type';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(
    private productService: ProductService,
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
  }

  applyFilter(){
    const text = this.searchText.trim().toLocaleLowerCase()
    this.filterProducts = this.products.filter((product)=> 
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text) ||
      product.price.toString().includes(text)
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

  addToCart(product: any) {
    console.log('Added to cart:', product);
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
