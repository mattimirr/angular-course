import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

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
        if(count === 2){
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count greater than 3'));
        }
        count++;
      }, 1000)
    });

   
    this.firstSub =  customIntervalObservable.pipe(map((data: number) => {
      return 'Round : ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Completed');
    });
  }
  ngOnDestroy() {
    this.firstSub.unsubscribe();
  }

}
