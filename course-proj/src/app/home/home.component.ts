import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSub: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000)
    });
    this.firstSub = customIntervalObservable.subscribe(data => {
      console.log(data);
    })
  }
  ngOnDestroy() {
    this.firstSub.unsubscribe();
  }

}
