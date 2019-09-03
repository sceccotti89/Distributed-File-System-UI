import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActionTypes } from '../actions/file.action';
import { PayloadAction } from 'src/app/shared/models/payload-action.model';
import { DocumentService } from 'src/app/shared/services/document.service';

@Injectable()
export class FileEffects {
    @Effect()
    loadFiles$ = this.actions$.pipe(
      ofType(ActionTypes.getFiles),
      mergeMap((value: PayloadAction) => this.documentService.getFiles({ filePath: value.payload.folder, deep: value.payload.deep })
      .pipe(
        map(files => ({ type: ActionTypes.getFilesSuccess, payload: files })),
        catchError(() => EMPTY)
      ))
    );

  constructor(
    private actions$: Actions,
    private documentService: DocumentService
  ) {}
}
