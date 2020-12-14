import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountUserModel } from 'src/app/core/model/AccountUser.model';
import { selectAccountUserData } from 'src/app/redux/selector/account.selector';

@Component({
  selector: 'account-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: AccountUserModel;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectAccountUserData)
      .subscribe((user) => (this.user = user));
  }
}
