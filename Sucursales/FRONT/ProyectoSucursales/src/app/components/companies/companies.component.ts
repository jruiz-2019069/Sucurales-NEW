import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/Models/CompanyModel';
import { CompanyRestService } from 'src/app/services/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  //Arreglo de empresas
  arrayCompanies: any = [];

  company: CompanyModel;

  //Company updated
  companyUpdate = {
    _id: "",
    name: "",
    typeCompany: "",
    location: "",
    phone: "",
    email: "",
    userCompany: "",
    passwordCompany: "",
    role: ""
  }

  constructor(
    public companyRest: CompanyRestService
  ) {
    this.company = new CompanyModel("", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.getCompanies();
  }


  getCompanies(){
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => {
        this.arrayCompanies = res.companiesFound;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addCompany(){
    this.companyRest.addCompany(this.company).subscribe({
      next: (res: any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getCompanies();
      },
      error:(err) =>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  getCompany(idCompany: any){
    this.companyRest.getCompany(idCompany).subscribe({
      next: (res: any) => {
        this.companyUpdate.name = res.companyFound.name;
        this.companyUpdate.typeCompany = res.companyFound.typeCompany;
        this.companyUpdate.location = res.companyFound.location;
        this.companyUpdate.phone = res.companyFound.phone;
        this.companyUpdate.email = res.companyFound.email;
        this.companyUpdate.userCompany = res.companyFound.userCompany;
        this.companyUpdate.passwordCompany = res.companyFound.passwordCompany;
        this.companyUpdate._id = res.companyFound._id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateCompany(){
    this.companyRest.updateCompany(this.companyUpdate._id, this.companyUpdate).subscribe({
      next: (res: any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getCompanies();
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

  deleteCompany(){
    this.companyRest.deleteCompany(this.companyUpdate._id).subscribe({
      next: (res: any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getCompanies();
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

  resetForm(addCompanyForm:any){
    addCompanyForm.reset();
  }


}
