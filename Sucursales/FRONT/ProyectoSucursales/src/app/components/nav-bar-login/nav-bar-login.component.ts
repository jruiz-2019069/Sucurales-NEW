import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import { CompanyModel } from 'src/app/Models/CompanyModel';


@Component({
  selector: 'app-nav-bar-login',
  templateUrl: './nav-bar-login.component.html',
  styleUrls: ['./nav-bar-login.component.css']
})
export class NavBarLoginComponent implements OnInit {

  //Objeto para poder logearse.
  dataLogin = {
    user: "",
    password: ""
  }

 //Instancia de una compañia. 
 company: CompanyModel;

  constructor(
    private navBarRest: NavBarLoginRestService,
    private router: Router
  ) {
    this.company = new CompanyModel("", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
  }

  //Método para logearse
  login(){
    this.navBarRest.login(this.dataLogin).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.companyFound || res.adminFound));
        if(this.navBarRest.getUser().role === "COMPANY"){
          this.router.navigateByUrl("office");
        }else{
          this.router.navigateByUrl("companies");
        }
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  //Método para que una compañia se pueda registrar.
  register(){
    this.navBarRest.register(this.company).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  resetForm(registerForm:any){
    registerForm.reset();
  }

}
