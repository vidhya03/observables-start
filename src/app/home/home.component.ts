import { Component, OnInit, OnDestroy } from '@angular/core';
// import 'rxjs/add/observable/interval';
import { Observer, Subscription, Observable, interval } from 'rxjs';
// import 'rxjs/Rx';
// import {map} from 'rxjs/internal/Observable/map';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberSubscription: Subscription;
  customSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    const myNumbers = interval(1000).pipe(
      map((data: number) => {
        return data * 2;
      })
    );
    this.numberSubscription = myNumbers.subscribe((num: Number) => {
      console.log(num);
    });
    const myObservable = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('Second package');
      }, 4000);

      // after observer error the next observer wont execute
      // setTimeout(() => {
      //   observer.error('this doesnt work');
      // }, 5000);

      setTimeout(() => {
        observer.complete();
      }, 6000);

      // after observer complete or error the next emmitter wont execute
      setTimeout(() => {
        observer.next('this wont print');
      }, 7000);
    });

    this.customSubscription = myObservable.subscribe(
      (data: any) => {
        console.log('on first');
        console.log(data);
      },
      (error: string) => {
        console.log('on error');
        console.log(error);
      },
      () => {
        console.log('on complete');
      }
    );
  }

  ngOnDestroy() {
    this.numberSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
