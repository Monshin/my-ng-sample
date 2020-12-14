import { Injectable, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { CookieService } from 'ngx-cookie-service';
import { Request, Response } from 'express';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyCookiesService extends CookieService {
  readonly path = '/';
  readonly expires = new Date(2030, 12, 31);
  readonly secure = environment.production;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private _platformId: any,
    @Optional() @Inject(REQUEST) private request: Request,
    @Optional() @Inject(RESPONSE) private response: Response
  ) {
    super(_document, _platformId);
  }

  public set = (name: string, value: any): void => {
    if (isPlatformBrowser(this._platformId)) {
      const domains = environment.domainUrl;
      domains.forEach((domain) => {
        super.set(name, value, this.expires, this.path, domain, this.secure);
      });
    }

    if (isPlatformBrowser(this._platformId)) {
      const domains = environment.domainUrl;
      domains.forEach((domain) => {
        this.response.cookie(name, value, {
          expires: this.expires,
          path: this.path,
          domain,
          secure: this.secure,
        });
      });
    }
  };

  public setWithNoneSameSite = (name: string, value: any): void => {
    if (isPlatformBrowser(this._platformId)) {
      const domains = environment.domainUrl;
      domains.forEach((domain) => {
        super.set(
          name,
          value,
          this.expires,
          this.path,
          domain,
          this.secure,
          'None'
        );
      });
    }

    if (isPlatformBrowser(this._platformId)) {
      const domains = environment.domainUrl;
      domains.forEach((domain) => {
        this.response.cookie(name, value, {
          expires: this.expires,
          path: this.path,
          domain,
          secure: this.secure,
          sameSite: 'none',
        });
      });
    }
  };

  public get = (name: string): any => {
    if (isPlatformBrowser(this._platformId)) {
      return super.get(name);
    }

    if (isPlatformServer(this._platformId)) {
      return this.request.cookies[name];
    }

    return null;
  };

  public delete = (name: string): void => {
    if (isPlatformBrowser(this._platformId)) {
      const domains = environment.domainUrl;
      domains.forEach((domain) => {
        super.delete(name, this.path, domain, this.secure);
      });
    }

    if (isPlatformServer(this._platformId)) {
      this.response.clearCookie(name);
    }
  };
}
