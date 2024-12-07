import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {


  @Input() data! : string;
  @Input() bgColor : 'primary' | 'secondary' = 'primary';
  @Input() submit : boolean = false;
  @Input() disabled : boolean = false;
}
