import { Action } from '@ngrx/store';

export enum LeftNavbarToggleActionTypes {
  leftNavbarToggleClicked = '[Button Toggle]:: Button clicked'
}

export class LeftNavbarToggle implements Action {
  readonly type = LeftNavbarToggleActionTypes.leftNavbarToggleClicked;
  constructor() {}
}

export type LeftNavbarActions = LeftNavbarToggle;
