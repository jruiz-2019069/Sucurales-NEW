import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyProductsComponent } from './components/company-products/company-products.component';
import { HomeComponent } from './components/home/home.component';
import { OfficeProductsComponent } from './components/office-products/office-products.component';
import { OfficeComponent } from './components/office/office.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'companies', component:CompaniesComponent},
  {path:'companyProducts', component:CompanyProductsComponent},
  {path:'office', component:OfficeComponent},
  {path:'officeProducts/:idOffice', component:OfficeProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
