import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { LandingPage } from './features/landing/landing.page';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
  ];
