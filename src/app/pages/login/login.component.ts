import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../configs/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  // authService = inject(AuthService);
  // router = inject(Router);

  constructor(private router: Router, private authService: AuthService) {}

  login(event: Event) {
    event.preventDefault();
    console.log(`Login: ${this.username} / ${this.password}`);
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe(() => {
        alert('Login success!');
        this.router.navigate(['/']);
      });
  }
}
