import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficeRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  addOffice(params: {}, idCompany: any){
    return this.http.post(environment.baseUrl + "office/addOffice/" + idCompany, params, {headers: this.httpOptions});
  }

  getOffices(idCompany: any){
    return this.http.get(environment.baseUrl + "office/getOffices/" + idCompany, {headers: this.httpOptions});
  }

  getOffice(idOffice: any){
    return this.http.get(environment.baseUrl + "office/getOffice/" + idOffice, {headers: this.httpOptions});
  }

  updateOffice(params: {}, idOffice: any){
    return this.http.put(environment.baseUrl + "office/updateOffice/" + idOffice, params, {headers: this.httpOptions});
  }

  deleteOffice(idOffice: any){
    return this.http.delete(environment.baseUrl + "office/deleteOffice/" + idOffice, {headers: this.httpOptions});
  }

  sellProduct(idProduct: any, params: {}){
    return this.http.put(environment.baseUrl + "office/sellProduct/" + idProduct, params, {headers: this.httpOptions});
  }

  getOfficesAdmin(idCompany:any){
    return this.http.get(environment.baseUrl + "admin/getOffices/" + idCompany, {headers: this.httpOptions});
  }

  

}
