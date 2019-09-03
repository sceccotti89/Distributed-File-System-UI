import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface FeatureState {
  checked: boolean;
  local: boolean;
  global: boolean;
}

export interface CheckboxState {
  checkbox: FeatureState;
}

export const selectFeature = createFeatureSelector<CheckboxState, FeatureState>('checkbox');

export const selectCheckboxState = createSelector(
  selectFeature,
  (state: FeatureState) => state
);
