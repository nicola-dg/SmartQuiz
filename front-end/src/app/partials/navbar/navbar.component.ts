import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private currentState : string | undefined = undefined;
  authService = inject(AuthService);
  

  constructor(private activedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activedRoute.url.subscribe({
      next: (url) => {this.currentState = url.pop()?.path }
    })
  }

  isDashboard() : boolean {
    return this.currentState === 'dash'
  }

  isAuthPage() : boolean {
    return this.currentState === 'login' || this.currentState === 'register'
  }

  onClickLogOut() : void{
    return this.authService.logout();
  }

}
