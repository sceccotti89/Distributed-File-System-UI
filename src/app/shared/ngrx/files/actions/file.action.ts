import { Action } from '@ngrx/store';

export enum ActionTypes {
  getFiles = '[Get Files]:: Retrieve files',
  getFilesSuccess = '[Get Files Success]:: Retrieve files success',
  downloadFiles = '[Download Files]:: Download requested files',
  downloadFilesSuccess = '[Download Files Success]:: Download requested files success',
  uploadFiles = '[Upload Files]:: Upload requested files',
  uploadFilesSuccess = '[Upload Files Success]:: Upload requested files success',
  deleteFiles = '[Delete Files]:: Delete requested files',
}

// TODO fare un refactoring in cui specifico meglio le azioni: scaricare i file (solo i dettagli), scaricare file fisici
export class GetFilesFromFolder implements Action {
  readonly type = ActionTypes.getFiles;
  constructor(public payload: { folder: string, deep: number }) {}
}

export class DownloadFiles implements Action {
  readonly type = ActionTypes.downloadFiles;
  constructor(public payload: { fileName: string }) {}
}

export class UploadFiles implements Action {
  readonly type = ActionTypes.uploadFiles;
  constructor(public payload: { files: File[] }) {}
}

export class DeleteFiles implements Action {
  readonly type = ActionTypes.deleteFiles;
  constructor(public payload: { fileName: string }) {}
}

export type FileActions = GetFilesFromFolder | DownloadFiles | UploadFiles | DeleteFiles;
