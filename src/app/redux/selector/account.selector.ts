import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../reducer/account.reducer';

export const selectAccount = createFeatureSelector<State>('account');

export const selectAccountUserData = createSelector(
  selectAccount,
  (state: State) => state.user
);

export const selectToken = createSelector(
  selectAccount,
  (state: State) => state.token
);
