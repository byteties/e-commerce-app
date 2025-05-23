import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'landing-page',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule]
})
export class LandingPage {
  username = '';
  password = '';
  errorMessage = '';
  private router = inject(Router);
  private http = inject(HttpClient);

  login() {
    this.errorMessage = '';
    this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (result) => {
        localStorage.setItem('access_token', result.access_token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
