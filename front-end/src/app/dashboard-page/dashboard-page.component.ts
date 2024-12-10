import { Component, inject, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../partials/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NotificationService } from '../../services/notification/NotificationService';
import { Notification } from '../../services/notification/notification-types';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from "../partials/button/button.component";
import { NotificationComponent } from "../partials/notification/notification.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule, ButtonComponent, NotificationComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

   router = inject(Router);
   notificationService = inject(NotificationService);
   notifications: Notification[] = [];
   showModal: boolean = false;
   showNotifications: boolean = false;
   quizURL: string = '';


   ngOnInit(){
      this.notificationService.getAllNotification().subscribe({
         next: (retrivedNotifications: Notification[]) => this.notifications = retrivedNotifications
      })      
   }


   navigateToCreateQuiz(){
    this.router.navigate(["/quiz"]);
   }

   toggleModalVisibility() {
      this.showModal = !this.showModal;
   }

   resetForm(form: NgForm){
      form.resetForm();
   }

   navigateToQuizByUrl(form: NgForm) : void{
      if(form.valid){
         const basePath = this.quizURL.match(/\/quiz.*/)?.[0]; 
         if (basePath) {
            this.router.navigate([basePath]); 
         } else {
            console.error("Invalid URL format. Could not navigate.");
         }
      }
   }

   toggleNotifications(){
      this.showNotifications = !this.showNotifications
   }


   navigateToOutcome(notification : Notification){

      this.router.navigate([`quiz/view/${notification.QuizId}/outcome`], {
         queryParams:{
            OutcomeId: notification.OutcomeId
         }
      })
   }
}
