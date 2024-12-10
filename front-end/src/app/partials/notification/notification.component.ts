import { Component, Input } from '@angular/core';
import { Notification } from '../../../services/notification/notification-types';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  @Input() notification! : Notification;
}
