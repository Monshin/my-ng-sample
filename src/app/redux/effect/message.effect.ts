import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NotificationsService, NotificationType } from 'angular2-notifications';

import * as messageActions from '../action/message.action';
// import * as accountActions from '../action/account.action';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private notificationsService: NotificationsService
  ) {}

  show$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(messageActions.messageShow),
      map(({ title, content, variant }) => {
        var messageType = variant || NotificationType.Error;
        setTimeout(() =>
          this.notificationsService.create(
            title,
            content,
            messageType as NotificationType
          )
        );

        return { type: 'NO_ACTION' };
      })
    )
  );

  showAjaxError$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(messageActions.messageShowAjaxError),
      mergeMap(({ error }) => {
        const errorRes = error.error;
        const code = errorRes ? errorRes.code || errorRes.status : null;
        let title = null;
        let content = '系統發生錯誤';
        if (error.status === 401 || error.status === 403) {
          title = '登入憑證已過期或失效';
          content = '將重新導向至登入頁。';
          return of(
            messageActions.messageShow({ title, content, variant: 'error' })
            // TODO: 重新導向登入頁
            // accountActions.redirectLogin()
          );
        } else if (error.status === 503) {
          title = '系統忙碌中';
          content = '伺服器沒有回應';
        } else if (errorRes) {
          if (errorRes.message && typeof errorRes.message === 'string') {
            content = errorRes.message;
          } else {
            content = '系統發生錯誤';
          }
        }

        return of(
          messageActions.messageShow({ title, content, variant: 'error' })
        );
      })
    )
  );

  clearAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(messageActions.messageClearAll),
      map(() => {
        this.notificationsService.remove();

        return { type: 'NO_ACTION' };
      })
    )
  );
}
