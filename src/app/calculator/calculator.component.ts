import { Component, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Configuration } from './calculator.model';
import { parseDecimal } from '../shared/utils/number-utils';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {
  calculatorForm: FormGroup = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+([.,]\d{1,2})?$/),
      Validators.min(1),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(1),
    ]),
    rate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+([.,]\d{1,2})?$/),
      Validators.min(1),
      Validators.max(100),
    ]),
    frequency: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(1),
    ]),
    capitalization: new FormControl(false, [Validators.required]),
  });

  readonly changeConfiguration: OutputEmitterRef<Configuration<number>> =
    output<Configuration<number>>();

  onSubmit() {
    if (!this.calculatorForm.valid) return;

    const rawConfiguration: Configuration<string> = this.calculatorForm.value;

    this.changeConfiguration.emit({
      amount: parseDecimal(rawConfiguration.amount),
      duration: parseInt(rawConfiguration.duration),
      rate: parseDecimal(rawConfiguration.rate),
      frequency: parseInt(rawConfiguration.frequency),
      capitalization: rawConfiguration.capitalization,
    });
  }
}
