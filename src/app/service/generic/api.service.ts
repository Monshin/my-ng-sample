import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { selectToken } from 'src/app/redux/selector/account.selector';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private store: Store, private http: HttpClient) {}

  get(
    url: string,
    queryObj: any
  ): Observable<Object> {
    const params = new HttpParams({
      fromObject: queryObj,
    });

    return this.store.select(selectToken).pipe(
      mergeMap((token) =>
        this.http.get(`${environment.apiUrl}${url}`, {
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          params,
        })
      )
    );
  }
}
