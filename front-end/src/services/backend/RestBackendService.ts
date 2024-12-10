import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthRequest } from "../auth/auth-state.type";



@Injectable({
    providedIn: "root"
})
export class RestBackendService{
  
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private _httpClient = inject(HttpClient);
  private _url = "http://localhost:3000";
    
    
    public get httpClient() {
      return this._httpClient;
    }
    public set httpClient(value) {
      this._httpClient = value;
    }
    
    public get httpOptions() {
      return this._httpOptions;
    }
    public set httpOptions(value) {
      this._httpOptions = value;
    }
    public get url() {
      return this._url;
    }
    public set url(value) {
      this._url = value;
    }

  }
  