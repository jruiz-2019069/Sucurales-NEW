import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsCompanyRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getProductsCompany(idCompany: any){
    return this.http.get(environment.baseUrl + "productCompany/getProductsCompany/" + idCompany, {headers: this.httpOptions});
  }

  addProductCompany(params: {}, idCompany:any){
    return this.http.post(environment.baseUrl + "productCompany/addProductCompany/" + idCompany, params, {headers: this.httpOptions});
  }

  getProductCompany(idProduct: any){
    return this.http.get(environment.baseUrl + "productCompany/getProductCompany/" + idProduct, {headers: this.httpOptions});
  }

  updateProductCompany(params: {}, idProduct: any){
    return this.http.put(environment.baseUrl + "productCompany/updateProductCompany/" + idProduct, params, {headers: this.httpOptions});
  }

  deleteProductCompany(idProduct: any){
    return this.http.delete(environment.baseUrl + "productCompany/deleteProductCompany/" + idProduct, {headers: this.httpOptions});
  }

  getCompanyProducts(idCompany: any){
    return this.http.get(environment.baseUrl + "admin/getCompanyProducts/" + idCompany, {headers: this.httpOptions});
  }


}
