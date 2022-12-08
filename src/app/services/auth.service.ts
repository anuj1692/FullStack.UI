import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

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
}
