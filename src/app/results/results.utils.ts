import { Configuration } from '../calculator/calculator.model';
import { MonthlyData } from './results.model';

export function calculateResults(data: Configuration<number>) {
  return calculate(data, data.amount, 1, 0, []);
}

function calculate(
  data: Configuration<number>,
  currentAmount: number,
  currentMonth: number,
  currentGain: number,
  output: MonthlyData[]
): MonthlyData[] {
  const initialAmount: number = data.amount;
  const duration: number = data.duration;
  const frequency: number = data.frequency;
  const calculatedRate: number = data.rate / (12 / frequency) / 100;
  const areCapitalized: boolean = data.capitalization;

  if (currentMonth > duration) return output;

  /*
   * `currentGain` is 0
   * except in months when interest is paid out,
   * i.e., in months where `currentMonth % frequency === 0`.
   * In these months, when interest is paid,
   * the calculation must also consider potential capitalization.
   */
  currentGain =
    currentMonth % frequency === 0
      ? areCapitalized
        ? currentAmount * calculatedRate
        : initialAmount * calculatedRate
      : 0;
  output.push([currentAmount, currentGain, currentAmount + currentGain]);
  currentAmount += currentGain;

  currentMonth++;

  return calculate(data, currentAmount, currentMonth, currentGain, output);
}
