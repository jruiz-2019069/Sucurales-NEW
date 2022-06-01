import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSupplierOffice'
})
export class SearchSupplierOfficePipe implements PipeTransform {

  transform(products:any, search:any) {
    if(search == undefined){
      return products;
    }else{
      return products.filter((productName: any) => {
        return productName.supplier.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
