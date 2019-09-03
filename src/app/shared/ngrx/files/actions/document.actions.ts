import { Action } from '@ngrx/store';

export enum DocumentActionTypes {
  documentView = '[Document]:: Document show/hide'
}

export class DocumentView implements Action {
  readonly type = DocumentActionTypes.documentView;
  constructor(public payload: { view: boolean }) {}
}

export type DocumentActions = DocumentView;
