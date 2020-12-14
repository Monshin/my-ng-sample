import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import { selectToken } from '../../../redux/selector/account.selector';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = environment.siteName;
  isLogin: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectToken).subscribe((token) => {
      this.isLogin = !!token;
    });
  }
}
