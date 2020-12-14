import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { selectAccountUserData } from '../selector/account.selector';
import * as messageActions from '../action/message.action';
import * as accountActions from '../action/account.action';

import { UserService } from 'src/app/service/user.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private userService: UserService
  ) {}

  receiveToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(accountActions.accountReceiveToken),
      switchMap(({ token }) => {
        return of(
          accountActions.accountSetToken({ token }),
          accountActions.accountGetUser()
          // messageActions.messageShow({ content: token, variant: 'info' })
        );
      })
    )
  );

  getUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(accountActions.accountGetUser),
      withLatestFrom(this.store$.select(selectAccountUserData)),
      switchMap(([action, user]) => {
        if (user && user.id) {
          return this.userService.getUser(user.id).pipe(
            map((response: any) => {
              return accountActions.accountReceiveUser({
                user: response.data,
              });
            }),
            catchError((error) =>
              of(messageActions.messageShowAjaxError({ error }))
            )
          );
        }

        return EMPTY;
      })
    )
  );
}
