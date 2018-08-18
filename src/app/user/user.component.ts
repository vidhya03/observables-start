import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
    console.log('im constructor');
  }

  ngOnInit() {
    console.log('i am in on init');
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(params);
      console.log(JSON.parse(JSON.stringify(params)));
    });
  }
}
