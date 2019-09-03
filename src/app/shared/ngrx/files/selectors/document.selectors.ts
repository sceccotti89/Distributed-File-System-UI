import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface FeatureState {
    view: boolean;
}

export interface DocumentState {
    showDoc: FeatureState;
}

export interface FileState {
    files: DocumentState;
}

export const selectFeature = createFeatureSelector<FileState, DocumentState>('files');
export const selectDocumentState = createSelector(
    selectFeature,
    (state: DocumentState) => state.showDoc.view
);
