import { Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { RestBackendService } from "../backend/RestBackendService";
import { Observable } from "rxjs";
import { Notification } from "./notification-types";


@Injectable({
    providedIn: "root"
})
export class NotificationService extends RestBackendService{

    
    createNotification(notification: Notification) : Observable<Notification> {
        const url = `${this.url}/notification`;
        return this.httpClient.post<Notification>(url, notification, this.httpOptions)
      }

    getAllNotification() : Observable<Notification[]> {
        const url = `${this.url}/notification`;
        return this.httpClient.get<Notification[]>(url, this.httpOptions);
      }

    getNotificationById(id: number) : Observable<Notification>{
        const url = `${this.url}/notification/${id}`;
        return this.httpClient.get<Notification>(url, this.httpOptions);
    }

    deleteNotificationByOutcomeId(outcomeId: number){
      const url = `${this.url}/notification/${outcomeId}`;
      return this.httpClient.delete<Notification>(url, this.httpOptions);
    }


}