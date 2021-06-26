import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(value:any, searchInput:string, searchType:string): any {
    return searchInput ? value.filter(data => (`${data?.queryParams?.q} in ${data?.queryParams?.t}`.includes(searchInput))) : value;
  }

}
