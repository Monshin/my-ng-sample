import { Action, createReducer, on } from '@ngrx/store';

import { accountSetToken, accountReceiveUser } from '../action/account.action';
import { AccountUserModel } from '../../core/model/AccountUser.model';

export interface State {
  user: AccountUserModel | null;
  token: string;
  timer: number;
}

const initialState: State = {
  user: null,
  token: null,
  timer: 120,
};

const userReducer = createReducer(
  initialState,
  on(accountSetToken, (state, action) => ({
    ...state,
    token: action.token,
    timer: new Date().getTime(),
  })),
  on(accountReceiveUser, (state, action) => ({
    ...state,
    user: {
      ...state.user,
      ...action.user,
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
