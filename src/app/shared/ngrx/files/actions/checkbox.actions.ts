import { Action } from '@ngrx/store';

export enum CheckboxActionTypes {
  checkboxClicked = '[Checkbox]:: Checkbox clicked'
}

export class CheckboxClick implements Action {
  readonly type = CheckboxActionTypes.checkboxClicked;
  constructor(public payload: { checked: boolean, local: boolean, global: boolean }) {}
}

export type CheckboxActions = CheckboxClick;
