import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeProductsRestService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public navBarRest: NavBarLoginRestService,
    public http: HttpClient
  ) { }

  getProductsOffice(idOffice: any){
    return this.http.get(environment.baseUrl + "productOffice/getProductsOffice/" + idOffice, {headers: this.htppOptions});
  }
}
