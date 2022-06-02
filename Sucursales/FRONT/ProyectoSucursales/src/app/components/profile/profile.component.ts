import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/Models/CompanyModel';
import { CompanyRestService } from 'src/app/services/company-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Instancia de una empresa
  company: CompanyModel;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public companyRest: CompanyRestService
  ) { 
    this.company = new CompanyModel("", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(){
    this.companyRest.getCompany(this.navBarRest.getUser()._id).subscribe({
      next: (res: any) => {
        this.company.name = res.companyFound.name;
        this.company.typeCompany = res.companyFound.typeCompany;
        this.company.location = res.companyFound.location;
        this.company.phone = res.companyFound.phone;
        this.company.email = res.companyFound.email;
        this.company.userCompany = res.companyFound.userCompany;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  updateCompany(){
    this.companyRest.updateCompany(this.navBarRest.getUser()._id, this.company).subscribe({
      next: (res: any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
      },
      error:(err) =>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }


}
