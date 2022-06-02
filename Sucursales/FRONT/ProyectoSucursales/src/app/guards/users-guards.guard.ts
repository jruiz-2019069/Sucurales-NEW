import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavBarLoginRestService } from '../services/nav-bar-login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuardsGuard implements CanActivate {

  constructor(
    public navBarRest: NavBarLoginRestService,
    public router: Router
  ){}

  canActivate() {
    if(this.navBarRest.getUser().role == "COMPANY" || this.navBarRest.getUser().role == "ADMIN"){
      return true;
    }{
      this.router.navigateByUrl("/");
      return false;
    }
  }
  
}
