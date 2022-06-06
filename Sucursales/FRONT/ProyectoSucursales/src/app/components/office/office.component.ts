import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeModel } from 'src/app/Models/officeModel';
import { CompanyRestService } from 'src/app/services/company-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import { OfficeRestService } from 'src/app/services/office-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  //Instancia de una sucursal
  office: OfficeModel;

  //Arreglo de sucursales
  arrayOffices: any = [];

  //Creación de un objeto para actualizar
  officeUpdate = {
    _id: "",
    name: "",
    direction: "",
    phone: "",
    email: "",
    idCompany: "" 
  }

  //ID de la empresa seleccionada siendo role ADMIN
  idCompanyAdmin: any;

  //ROLE
  roleLoged: any;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public officeRest: OfficeRestService,
    public activated: ActivatedRoute,
    public companyRest: CompanyRestService
  ) { 
    this.office = new OfficeModel("", "", "", "", "", "");
  }

  //Nombre empresa
  nameCompany = this.navBarRest.getUser().name;

  //Nombre empresa admin
  nameCompanyAdmin: any;

  search: string = "";

  ngOnInit(): void {
    this.roleLoged = this.navBarRest.getUser().role;
    if(this.roleLoged === "COMPANY"){
      this.getOffices();
      this.office.idCompany = this.navBarRest.getUser()._id;
    }
    else if(this.roleLoged === "ADMIN"){
      this.activated.paramMap.subscribe( (idRuta) => {
        this.idCompanyAdmin = idRuta.get("idCompany");
      });
      this.getOfficesAdmin();
      this.getCompany();
    }
  }

  addOffice(){
    this.officeRest.addOffice(this.office, this.navBarRest.getUser()._id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getOffices();
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

  getOffices(){
    this.officeRest.getOffices(this.navBarRest.getUser()._id).subscribe({
      next: (res: any) => {
        this.arrayOffices = res.offices;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getOfficesAdmin(){
    this.officeRest.getOfficesAdmin(this.idCompanyAdmin).subscribe({
      next: (res: any) => {
        this.arrayOffices = res.offices;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getOffice(idCompany: any){
    this.officeRest.getOffice(idCompany).subscribe({
      next: (res: any) => {
        this.officeUpdate.name = res.office.name;
        this.officeUpdate.direction = res.office.direction;
        this.officeUpdate.phone = res.office.phone;
        this.officeUpdate.email = res.office.email;
        this.officeUpdate._id = res.office._id;
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

  updateOffice(){
    this.officeRest.updateOffice(this.officeUpdate, this.officeUpdate._id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getOffices();
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

  deleteOffice(){
    this.officeRest.deleteOffice(this.officeUpdate._id).subscribe({
      next: (res: any) => {
        this.getOffices();
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
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

  getCompany(){
    this.companyRest.getCompany(this.idCompanyAdmin).subscribe({
      next: (res: any) => {
        this.nameCompanyAdmin = res.companyFound.name;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  resetForm(addOfficeForm:any){
    addOfficeForm.reset();
  }

}
