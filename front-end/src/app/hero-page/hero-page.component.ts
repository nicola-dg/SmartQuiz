import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from "../partials/button/button.component";

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss'
})
export class HeroPageComponent {

}
