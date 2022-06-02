import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarLoginComponent } from './components/nav-bar-login/nav-bar-login.component';
import { HomeComponent } from './components/home/home.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { OfficeComponent } from './components/office/office.component';
import { CompanyProductsComponent } from './components/company-products/company-products.component';
import { OfficeProductsComponent } from './components/office-products/office-products.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarLoginRestService } from './services/nav-bar-login-rest.service';
import { OfficeRestService } from './services/office-rest.service';
import { ProductsCompanyRestService } from './services/products-company-rest.service';
import { OfficeGraphicComponent } from './components/office-graphic/office-graphic.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { SearchOfficeCompanyPipe } from './pipes/search-office-company.pipe';
import { SearchProductCompanyPipe } from './pipes/search-product-company.pipe';
import { SearchProductOfficePipe } from './pipes/search-product-office.pipe';
import { SearchSupplierOfficePipe } from './pipes/search-supplier-office.pipe';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavBarLoginComponent,
    HomeComponent,
    CompaniesComponent,
    OfficeComponent,
    CompanyProductsComponent,
    OfficeProductsComponent,
    OfficeGraphicComponent,
    SearchOfficeCompanyPipe,
    SearchProductCompanyPipe,
    SearchProductOfficePipe,
    SearchSupplierOfficePipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
    
  ],
  providers: [
    NavBarLoginRestService,
    OfficeRestService,
    ProductsCompanyRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
