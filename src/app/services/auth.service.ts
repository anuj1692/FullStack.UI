import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //baseApiUrl: string = environment.baseApiUrl;
  baseApiUrl: string = 'https://localhost:5001';
  constructor(private http: HttpClient, private route: Router) {}

  signup(userObj: any){
    return this.http.post<any>(
      this.baseApiUrl + '/api/user/register',
      userObj
    );
  }

  login(loginObj: any){
    return this.http.post<any>(
      this.baseApiUrl + '/api/user/authenticate',
      loginObj
    );
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  signOut(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
