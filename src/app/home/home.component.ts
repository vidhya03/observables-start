import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // const myNumbers = Observable.interval(1000);
    // myNumbers.subscribe((num: Number) => {
    //   console.log(num);
    // });
    const myObservable = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('Second package');
      }, 4000);

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

    myObservable.subscribe(
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
}
