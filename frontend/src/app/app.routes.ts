import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { CartComponent } from './features/cart/cart.component';
import { LandingPage } from './features/landing/landing.page';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'products', component: ProductListComponent, canActivate: [authGuard]  },
    { path: 'cart', component: CartComponent, canActivate: [authGuard]  },
  ];
