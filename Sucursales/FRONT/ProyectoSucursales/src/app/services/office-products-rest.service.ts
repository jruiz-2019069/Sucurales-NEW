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

  getProductOffice(idProduct: any){
    return this.http.get(environment.baseUrl + "productOffice/getProductOffice/" + idProduct, {headers: this.htppOptions});
  }

  sellProduct(idProduct: any, params: any){
    let body = JSON.stringify({"stock": params});
    return this.http.put(environment.baseUrl + "office/sellProduct/" + idProduct, body, {headers: this.htppOptions});
  }

  sortProductsOfficeByLargerStock(idOffice: any){
    return this.http.get(environment.baseUrl + "productOffice/sortProductsOfficeByLargerStock/" + idOffice, {headers: this.htppOptions});
  }

  sortProductsOfficeByRetailStock(idOffice: any){
    return this.http.get(environment.baseUrl + "productOffice/sortProductsOfficeByRetailStock/" + idOffice, {headers: this.htppOptions});
  }
}
