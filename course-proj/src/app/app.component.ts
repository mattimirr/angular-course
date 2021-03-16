import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  odd: number[] = [];
  even: number[] = [];
  onIntervalFired(actualnumber: number) {
    if (actualnumber % 2 === 0) {
      this.even.push(actualnumber);
    } else {
      this.odd.push(actualnumber);
    }
  }

}
