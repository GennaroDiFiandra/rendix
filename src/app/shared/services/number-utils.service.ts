import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberUtilsService {
  parseDecimal(value: string): number {
    return parseFloat(value.replace(',', '.'));
  }
}
