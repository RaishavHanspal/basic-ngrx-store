import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(value:any, searchInput:string): any {
    return searchInput ? value.filter(data => data?.queryParams?.q.includes(searchInput)) : value;
  }

}
