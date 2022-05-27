import { Component, OnInit } from '@angular/core';
import { productCompanyModel } from 'src/app/Models/productCompany';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import { ProductsCompanyRestService } from 'src/app/services/products-company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-products',
  templateUrl: './company-products.component.html',
  styleUrls: ['./company-products.component.css']
})
export class CompanyProductsComponent implements OnInit {

  //Arreglo de productos de la empresa logeada.
  arrayProducts: any = [];

  //Instancia de productos de una empresa.
  productCompany: productCompanyModel;

  //Objeto que almacena la data a actualizar.
  productUpdate = {
    _id: "",
    name: "",
    supplier: "",
    price: 0,
    stock: 0,
    idCompany: ""
  }

  constructor(
    public navBarRest: NavBarLoginRestService,
    public companyProductRest: ProductsCompanyRestService
  ) { 
    this.productCompany = new productCompanyModel("", "", "", 0, 0, "");
  }

  ngOnInit(): void {
    this.getProductsCompany();
  }

  getProductsCompany(){
    this.companyProductRest.getProductsCompany(this.navBarRest.getUser()._id).subscribe({
      next: (res: any) => {
        this.arrayProducts = res.productsCompany;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addProductCompany(){
    this.companyProductRest.addProductCompany(this.productCompany, this.navBarRest.getUser()._id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getProductsCompany();
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

  getProductCompany(idProduct: any){
    this.companyProductRest.getProductCompany(idProduct).subscribe({
      next: (res: any) => {
        this.productUpdate.name = res.productCompany.name;
        this.productUpdate.supplier = res.productCompany.supplier;
        this.productUpdate.price = res.productCompany.price;
        this.productUpdate.stock = res.productCompany.stock;
        this.productUpdate._id = res.productCompany._id;
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

  updateProductCompany(){
    this.companyProductRest.updateProductCompany(this.productUpdate, this.productUpdate._id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getProductsCompany();
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

  deleteProductCompany(){
    this.companyProductRest.deleteProductCompany(this.productUpdate._id).subscribe({
      next: (res: any) => {
        this.getProductsCompany();
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
