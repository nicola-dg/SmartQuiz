import { Injectable } from "@angular/core";
import { RestBackendService } from "../backend/RestBackendService";
import { Observable } from "rxjs";
import { User } from "./user-types";

export interface OpenUser{
    username: string;
  }


@Injectable({
    providedIn: "root"
})
export class UserService extends RestBackendService{

    getUserById(id: number) : Observable<User>{
        const url = `${this.url}/user/${id}`;
        return this.httpClient.get<User>(url, this.httpOptions);
    }

    getOpenUserById(id: number) : Observable<OpenUser>{
        const url = `${this.url}/user/${id}/openinfo`;
        return this.httpClient.get<OpenUser>(url, this.httpOptions);
    }
}