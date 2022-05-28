import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeModel } from 'src/app/Models/officeModel';
import { OfficeProductsRestService } from 'src/app/services/office-products-rest.service';
import { OfficeRestService } from 'src/app/services/office-rest.service';

@Component({
  selector: 'app-office-products',
  templateUrl: './office-products.component.html',
  styleUrls: ['./office-products.component.css']
})
export class OfficeProductsComponent implements OnInit {

  //Variable que almacena el id de la sucursal seleccionada
  idOffice: any;

  //Arreglo que almacena los productos de una sucursal
  arrayProducts: any = [];

  //Instancia de una sucursal
  office: OfficeModel;

  constructor(
    public officeProductRest: OfficeProductsRestService,
    public activatedRoute: ActivatedRoute,
    public officeRest: OfficeRestService
  ) { 
    this.office = new OfficeModel("", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (idRuta) => {
      this.idOffice = idRuta.get("idOffice");
    });
    this.getProductsOffice();
    this.getOffice();
  }

  getProductsOffice(){
    this.officeProductRest.getProductsOffice(this.idOffice).subscribe({
      next: (res: any) => {
        this.arrayProducts = res.productsOffice;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getOffice(){
    this.officeRest.getOffice(this.idOffice).subscribe({
      next: (res: any) => {
        this.office.name = res.office.name;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}
