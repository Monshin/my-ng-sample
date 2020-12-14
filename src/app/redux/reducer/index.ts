import { ActionReducer } from '@ngrx/store';
import { reducer as AccountReducer, State as AccountState } from './account.reducer';

export interface AppState {
  account: AccountState;
}

type Reducers = {
  [key in keyof AppState]: ActionReducer<AppState[key]>;
};

export const reducers: Reducers = { account: AccountReducer };
