import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AccessService } from '../../services/AccessService';
import { NavbarComponent } from "../partials/navbar/navbar.component";
import { ButtonComponent } from "../partials/button/button.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: '../register-page/register-page.component.scss',
})
export class LoginPageComponent {
  
  accessService = inject(AccessService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  toastrService = inject(ToastrService)
  showPassword: boolean = false;
  
  username: string = '';
  email: string = '';
  password: string = '';

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.accessService
      .login({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (token) => {
          this.authService.updateToken(token);
          this.router.navigate(['/dash']);
        },
        error: (error) => {
          console.error(error);
          this.toastrService.error("Please use valid credentials or create an account", "Account doesn't exists");
        }
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onClick(): void {
    this.router.navigate(['']);
  }
}
