import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeModel } from 'src/app/Models/officeModel';
import { OfficeProductsRestService } from 'src/app/services/office-products-rest.service';
import { OfficeRestService } from 'src/app/services/office-rest.service';
import Swal from 'sweetalert2';

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

  //Variable que almacena el id del producto seleccionado
  idProduct: any;

  //Variable que almacena la cantidad a vender
  quantity: any;

  //Variable que almacena el nombre del producto seleccionado
  nameProduct: any;

  search: string = "";

  searchSupplier: string = "";

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

  getProductOffice(idProduct: any){
    this.officeProductRest.getProductOffice(idProduct).subscribe({
      next: (res: any) => {
        this.nameProduct = res.productOffice.name;
        this.idProduct = res.productOffice._id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  sellProduct(){
    this.officeProductRest.sellProduct(this.idProduct, this.quantity).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getProductsOffice();
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

  sortProductsOfficeByLargerStock(){
    this.officeProductRest.sortProductsOfficeByLargerStock(this.idOffice).subscribe({
      next: (res: any) => {
        this.arrayProducts = res.productsLargerStock;
        console.log(this.arrayProducts);
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  sortProductsOfficeByRetailStock(){
    this.officeProductRest.sortProductsOfficeByRetailStock(this.idOffice).subscribe({
      next: (res: any) => {
        this.arrayProducts = res.productsRetailStock;
        console.log(this.arrayProducts);
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
