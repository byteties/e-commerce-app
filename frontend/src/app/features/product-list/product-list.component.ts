import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductResponse } from '../../types/product.type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListComponent {
  products: Product[] = [];
  product: Product | null = null; 
  modalOpen: boolean = false;
  constructor(
    private productService: ProductService,
  ) {}
  public currentPage = 1;
  public productsPerPage = 10;
  public totalPages = 0;

  private getProducts() {
    this.productService.getProducts(this.currentPage, this.productsPerPage).subscribe((products: ProductResponse) => {
      this.products = products.data;
      this.totalPages = this.getTotalPages(products.total);
    });
  }

  ngOnInit() {
    this.getProducts()
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
}
