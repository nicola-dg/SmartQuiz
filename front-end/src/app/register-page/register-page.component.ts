import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AccessService } from '../../services/AccessService';
import { NavbarComponent } from "../partials/navbar/navbar.component";
import { ButtonComponent } from "../partials/button/button.component";
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'register-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
    username: string = '';
    email: string = '';
    password: string = '';
    showPassword: boolean = false;

    accessService = inject(AccessService);
    router: Router = inject(Router);
    toastrService = inject(ToastrService);
    authService = inject(AuthService);

    onClick(): void{
      this.router.navigate(['/login']);
    }

    toggleShowPassword(): void{
      this.showPassword = !this.showPassword;
    } 

    accountAlreadyExists(){

    }
    
    onSubmit(form: NgForm): void{
      if(!form.valid){
        return;
      }
      this.accessService.signup({
        username: this.username,
        email: this.email,
        password: this.password
      }).subscribe({
        next: () => {
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
              this.toastrService.success("Account created")
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
        ,
        error: (error) => {
          console.error(error); 
          this.toastrService.error("Account already exists. Please use a different email or username.");
        }
      });

    }
}
