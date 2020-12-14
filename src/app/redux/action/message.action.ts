import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'angular2-notifications';

export const messageShow = createAction(
  'MESSAGE_SHOW',
  props<{
    title?: string;
    content: string;
    variant?:
      | NotificationType
      | 'success'
      | 'error'
      | 'alert'
      | 'info'
      | 'warn'
      | 'bare';
  }>()
);

export const messageShowAjaxError = createAction(
  'MESSAGE_SHOW_AJAX_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const messageClearAll = createAction('MESSAGE_CLEAR_ALL');
