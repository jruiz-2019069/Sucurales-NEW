import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavBarLoginRestService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.getToken()
  });

  constructor(
    private http: HttpClient
  ) { }

  //Login
  login(params: {}){
    return this.http.post(environment.baseUrl + "company/login", params, {headers: this.htppOptions});
  }

  //Register
  register(params: {}){
   return this.http.post(environment.baseUrl + "admin/addCompany", params, {headers: this.htppOptions});
  }

  //Método para obtener el token de local storage.
  getToken(){
    let globalToken = localStorage.getItem("token");
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = "";
    }
    return token;
  }

  //Método para obtener el usuario del local storage
  getUser(){
    let globalUser = localStorage.getItem("user");
    let user;
    if(globalUser != undefined){
      user = JSON.parse(globalUser);
    }else{
      user = "";
    }
    return user;
  }
}
