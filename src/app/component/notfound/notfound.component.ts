import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'block-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotFoundComponent implements OnInit {
  @Input() title: string;
  
  constructor() {}

  ngOnInit(): void {}
}
