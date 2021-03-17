import { Component, OnInit } from '@angular/core';

import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inToAct: number = 0;
  actToIn: number = 0;

  constructor(private counterService: CounterService) {
  }

  ngOnInit() {
    this.counterService.activeUsers.subscribe((active: number) => {this.inToAct = active});
    this.counterService.inactiveUsers.subscribe((inactive: number) => {this.actToIn = inactive});
  }
}
