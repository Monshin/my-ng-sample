import { Component, OnInit } from '@angular/core';

import { MyHelmetService } from 'src/app/service/core/myHelmet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private helmetService: MyHelmetService) {
    this.helmetService.set({ title: '首頁' });
  }

  ngOnInit(): void {}
}
