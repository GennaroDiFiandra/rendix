import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Configuration } from '../calculator/calculator.model';
import { MonthlyData } from './results.model';
import { calculateResults } from './results.utils';

@Component({
  selector: 'app-results',
  imports: [DecimalPipe],
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  configuration: InputSignal<Configuration<number>> = input.required<Configuration<number>>();

  results: Signal<MonthlyData[]> = computed(() => {
    return calculateResults(this.configuration());
  });
}
