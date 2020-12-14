import { Component, OnInit } from '@angular/core';

import { MyHelmetService } from 'src/app/service/core/myHelmet.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private helmetService: MyHelmetService) {}

  ngOnInit(): void {
    this.helmetService.set({ title: '個人帳戶' });
  }
}
