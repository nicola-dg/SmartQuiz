import { RestBackendService } from "./backend/RestBackendService";
import { AuthRequest } from "./auth/auth-state.type";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AccessService extends RestBackendService{

    login(loginRequest: AuthRequest){
        const url = `${this.url}/auth`; 
        return this.httpClient.post<string>(url, loginRequest, this.httpOptions);
    }
    
    signup(signupRequest: AuthRequest){
        const url = `${this.url}/signup`; 
        return this.httpClient.post(url, signupRequest, this.httpOptions);
    }
}