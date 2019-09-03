import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface FeatureState {
    open: boolean;
}

export interface LeftNavbarState {
    leftNavbar: FeatureState;
}

export const selectFeature = createFeatureSelector<LeftNavbarState, FeatureState>('leftNavbar');

export const selectLeftNavbarState = createSelector(
    selectFeature,
    (state: FeatureState) => state.open
);
