import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router, private toast: NgToastService){}
  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      this.toast.error({detail: "ERROR", summary:"Please Login First"});
      this.route.navigate(['login'])
      return false;
    }
  }
}
