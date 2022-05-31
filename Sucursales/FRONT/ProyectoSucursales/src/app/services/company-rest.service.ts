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

  //Método para obtener las compañías 
  getCompanies(){
    return this.http.get(environment.baseUrl + "admin/getCompanies/", {headers: this.htppOptions});
  }

  //Método para agregar una compañía
  addCompany(params: {}){
    return this.http.post(environment.baseUrl + "admin/addCompany/", params, {headers: this.htppOptions});
  }

  //Método para obtener una empresa por medio de su ID.
  getCompany(idCompany: any){
    return this.http.get(environment.baseUrl + "admin/getCompany/" + idCompany, {headers: this.htppOptions});
  }

  //Método para actualicar una compañía siendo admin
  updateCompany(idCompany: any, params: {}){
    return this.http.put(environment.baseUrl + "admin/updateCompany/" + idCompany, params, {headers: this.htppOptions});
  }

  //Método para eliminar una empresa
  deleteCompany(idCompany: any){
    return this.http.delete(environment.baseUrl + "admin/deleteCompany/" + idCompany, {headers: this.htppOptions});
  }
  

}
