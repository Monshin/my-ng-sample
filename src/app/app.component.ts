import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';

import { MyHelmetService } from './service/core/myHelmet.service';

import { accountReceiveToken } from './redux/action/account.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  env = environment.env;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private helmetService: MyHelmetService,
    private cookiesService: CookieService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.helmetService.setDefault({
      description: '測試 Angular',
      keywords: 'Angular,測試',
      image: 'https://angular.io/assets/images/logos/angular/angular.svg',
    });

    const token = this.cookiesService.get('token');
    if (token) {
      this.store.dispatch(accountReceiveToken({ token }));
    }

    if (isPlatformServer(this.platformId)) {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.text = ``;
      this.renderer2.insertBefore(
        this._document.body,
        script,
        this._document.body.firstChild
      );
      this.store.subscribe((state) => {
        script.text = `window.__PRELOADED_STATE__ = ${JSON.stringify(
          state
        ).replace(/</g, '\\u003c')}`;
      });
    }
  }
}
