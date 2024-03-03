import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../configs/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  user?: any;

  logout() {
    this.authService.logout();
  }

  getCurrentAuthUser() {
    this.authService.getCurrentAuthUser().subscribe((response) => {
      console.log(response);
      this.user = response;
    });
  }
}
