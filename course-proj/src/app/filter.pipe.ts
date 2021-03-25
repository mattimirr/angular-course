import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, porpName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    } else {
      const resultArray = [];
      for(const item  of value){
        if(item[porpName] === filterString){
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }

}
