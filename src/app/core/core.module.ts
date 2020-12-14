import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { MyHelmetService } from '../service/core/myHelmet.service';
import { MyCookiesService } from '../service/core/myCookies.service';

@NgModule({
  imports: [SimpleNotificationsModule.forRoot({ timeOut: 3000 })],
  providers: [
    MyHelmetService,
    { provide: CookieService, useClass: MyCookiesService },
  ],
  exports: [SimpleNotificationsModule],
})
export class CoreModule {}
