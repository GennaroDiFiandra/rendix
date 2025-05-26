import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styles: `:host {@apply min-h-screen flex flex-col [&>*:last-child]:mt-auto}`,
})
export class AppComponent {
}
