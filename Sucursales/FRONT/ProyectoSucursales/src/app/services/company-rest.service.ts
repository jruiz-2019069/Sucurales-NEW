import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyRestService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public navBarRest: NavBarLoginRestService,
    public http: HttpClient
  ) { }

  addProductOffice(idCompany: any, idProduct: any, idOffice: any, params: any){
    let body = JSON.stringify({"stock": params});
    return this.http.post(environment.baseUrl + "company/addProductOffice/" + idCompany + "/" + idProduct + "/" + idOffice, body, {headers: this.htppOptions});
  }

  testCompanyController(params: any){
    let body=JSON.stringify({params});
    return this.http.post(environment.baseUrl + "company/testCompanyController", body,{headers: this.htppOptions});
  }

}
