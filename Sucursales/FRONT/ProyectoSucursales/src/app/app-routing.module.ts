import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyProductsComponent } from './components/company-products/company-products.component';
import { HomeComponent } from './components/home/home.component';
import { OfficeGraphicComponent } from './components/office-graphic/office-graphic.component';
import { OfficeProductsComponent } from './components/office-products/office-products.component';
import { OfficeComponent } from './components/office/office.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersGuardsGuard } from './guards/users-guards.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'companies', canActivate: [UsersGuardsGuard], component:CompaniesComponent},
  {path:'companyProducts', canActivate: [UsersGuardsGuard], component:CompanyProductsComponent},
  {path:'companyProducts/:idCompany', canActivate: [UsersGuardsGuard], component:CompanyProductsComponent},
  {path:'office', canActivate: [UsersGuardsGuard], component:OfficeComponent},
  {path:'office/:idCompany', canActivate: [UsersGuardsGuard], component:OfficeComponent},
  {path:'officeProducts/:idOffice', canActivate: [UsersGuardsGuard], component:OfficeProductsComponent},
  {path:'officeGraphic/:idOffice', canActivate: [UsersGuardsGuard], component: OfficeGraphicComponent},
  {path:"profile", canActivate: [UsersGuardsGuard], component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
