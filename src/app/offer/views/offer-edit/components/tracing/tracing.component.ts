import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss']
})
export class TracingComponent implements OnInit {
  comments: Icomments[];

  constructor() { 
    this.comments = [
      {person: 'N7928', comment: 'NY', date: '23-04-2022'},
      {person: 'A1928', comment: 'NY', date: '25-03-2022'},
      {person: 'Y8366', comment: 'NY', date: '16-05-2022'},
      {person: 'U2590', comment: 'NY', date: '18-06-2022'},
      {person: 'Z7093', comment: 'NY', date: '23-04-2022'}
  ];
  }

  ngOnInit(): void {
  }

}
interface Icomments {
  person: string,
  comment: string,
  date: string

}
