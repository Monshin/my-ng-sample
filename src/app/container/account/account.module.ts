import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  imports: [CommonModule, AccountRoutingModule],
  declarations: [AccountComponent, HomeComponent, SettingComponent],
})
export class AccountModule {}
