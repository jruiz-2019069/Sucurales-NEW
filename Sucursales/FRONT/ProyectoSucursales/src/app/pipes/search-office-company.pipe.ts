import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOfficeCompany'
})
export class SearchOfficeCompanyPipe implements PipeTransform {

  transform(offices:any, search:any) {
    if(search == undefined){
      return offices;
    }else{
      return offices.filter((officeName: any) => {
        return officeName.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
