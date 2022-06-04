import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productCompanyModel } from 'src/app/Models/productCompany';
import { CompanyRestService } from 'src/app/services/company-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import { OfficeRestService } from 'src/app/services/office-rest.service';
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
  
  //Arreglo de sucursales de la empresa que esta logeada
  arrayOffices: any = [];

  //Variable para almacenación del nombre del producto
  nameProduct = "";

  //Variable para almacenación del id del producto
  idProduct: any;

  //Variable que almacenará el id de la sucursal
  idOffice: any;

  //Objeto que almacenará la cantidad
  quantity = 0;

  idCompany: any;

  //Id de la compañia seleccionada siendo un administrador
  idCompanyAdmin: any;

  //Role logeado
  roleLoged: any;

  nameCompanyLoged: any;

  search: string = "";

  constructor(
    public navBarRest: NavBarLoginRestService,
    public companyProductRest: ProductsCompanyRestService,
    public officeRest: OfficeRestService,
    public companyRest: CompanyRestService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.productCompany = new productCompanyModel("", "", "", 0, 0, "");
  }

  ngOnInit(): void {
    this.roleLoged = this.navBarRest.getUser().role;
    if(this.roleLoged === "COMPANY"){
      this.getProductsCompany();
      this.getOffices();
      this.idCompany = this.navBarRest.getUser()._id;
      this.nameCompanyLoged = this.navBarRest.getUser().name;
    }else{
      this.activatedRoute.paramMap.subscribe( (idRuta) => {
        this.idCompanyAdmin = idRuta.get("idCompany");
      });
      this.getCompanyProductsAdmin();
    }
  }

  getCompanyProductsAdmin(){
    this.companyProductRest.getCompanyProducts(this.idCompanyAdmin).subscribe({
      next: (res: any) => {
        this.arrayProducts = res.companyProducts;
      },
      error: (err) => {
        console.log(err);
      }
    });
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

  getNameProduct(name: string, idProduct: string){
    this.nameProduct = name;
    this.idProduct = idProduct;     
  }

  addProductOffice(){
    this.companyRest.addProductOffice(this.navBarRest.getUser()._id, this.idProduct, this.idOffice, this.quantity).subscribe({
      next: (res: any) => {
        this.getProductsCompany();
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //PRUEBA
  testCompanyController(){
    this.companyRest.testCompanyController("PRUEBA").subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  resetForm(addProductForm:any){
    addProductForm.reset();
  }



}
