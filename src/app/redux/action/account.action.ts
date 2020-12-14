import { createAction, props } from '@ngrx/store';
import { AccountUserModel } from 'src/app/core/model/AccountUser.model';

export const accountReceiveToken = createAction(
  'ACCOUNT_RECEIVE_TOKEN',
  props<{ token: string }>()
);

export const accountSetToken = createAction(
  'ACCOUNT_SET_TOKEN',
  props<{ token: string }>()
);

export const accountGetUser = createAction('ACCOUNT_GET_USER');

export const accountReceiveUser = createAction(
  'ACCOUNT_RECEIVE_USER',
  props<{ user: Partial<AccountUserModel> }>()
);
