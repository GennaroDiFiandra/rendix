import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Configuration } from './calculator/calculator.model';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ResultsComponent } from './results/results.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let calculatorDebugElement: DebugElement;
  let resultsDebugElement: DebugElement;

  const configurationMock: Configuration<number> = {
    amount: 10000,
    duration: 24,
    rate: 5,
    frequency: 3,
    capitalization: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CalculatorComponent,
        ResultsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    calculatorDebugElement = fixture.debugElement.query(By.directive(CalculatorComponent));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render header, footer and calculator components initially', () => {
    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-calculator')).toBeTruthy();
  });

  it('should not render results component initially', () => {
    resultsDebugElement = fixture.debugElement.query(By.directive(ResultsComponent));
    expect(resultsDebugElement).toBeNull();
  });

  it('should render results component when configuration is available', () => {
    const calculatorComponent = calculatorDebugElement.componentInstance as CalculatorComponent;
    calculatorComponent.changeConfiguration.emit(configurationMock);
    fixture.detectChanges();
    resultsDebugElement = fixture.debugElement.query(By.directive(ResultsComponent));
    expect(resultsDebugElement).toBeTruthy();
    expect(resultsDebugElement!.componentInstance.configuration()).toEqual(configurationMock);
    expect(component.configuration).toEqual(configurationMock);
  });

  it('should update configuration when onGetConfiguration is called', () => {
    expect(component.configuration).toBeNull();
    component.onGetConfiguration(configurationMock);
    expect(component.configuration).toEqual(configurationMock);
  });
});
