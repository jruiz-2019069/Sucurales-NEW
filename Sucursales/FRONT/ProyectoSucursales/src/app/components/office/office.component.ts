import { Component, OnInit } from '@angular/core';
import { OfficeModel } from 'src/app/Models/officeModel';
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

  constructor(
    public navBarRest: NavBarLoginRestService,
    public officeRest: OfficeRestService
  ) { 
    this.office = new OfficeModel("", "", "", "", "", "");
  }

  //Nombre empresa
  nameCompany = this.navBarRest.getUser().name;

  ngOnInit(): void {
    this.office.idCompany = this.navBarRest.getUser()._id;
    this.getOffices();
  }

  addOffice(){
    this.officeRest.addOffice(this.office).subscribe({
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

}
