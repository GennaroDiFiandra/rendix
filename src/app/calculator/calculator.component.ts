import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Configuration } from './calculator.model';
import { NumberUtilsService } from '../shared/services/number-utils.service';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {
  private numberUtils = inject(NumberUtilsService);

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
      amount: this.numberUtils.parseDecimal(rawConfiguration.amount),
      duration: parseInt(rawConfiguration.duration),
      rate: this.numberUtils.parseDecimal(rawConfiguration.rate),
      frequency: parseInt(rawConfiguration.frequency),
      capitalization: rawConfiguration.capitalization,
    });
  }
}
