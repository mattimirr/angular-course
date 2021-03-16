import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedComponent = 'recipe';

  onNavigate(component: string) {
    this.loadedComponent = component;
  }
}
