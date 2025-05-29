import { Component } from '@angular/core';
import { Configuration } from './calculator/calculator.model';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, CalculatorComponent, ResultsComponent],
  templateUrl: './app.component.html',
  styles: `:host {@apply min-h-screen flex flex-col [&>*:last-child]:mt-auto}`,
})
export class AppComponent {
  configuration: Configuration<number> | null = null;

  onGetConfiguration(configuration: Configuration<number>) {
    this.configuration = configuration;
  }
}
