import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProductOffice'
})
export class SearchProductOfficePipe implements PipeTransform {

  transform(products:any, search:any) {
    if(search == undefined){
      return products;
    }else{
      return products.filter((productName: any) => {
        return productName.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
