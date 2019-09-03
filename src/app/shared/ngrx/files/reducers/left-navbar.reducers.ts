import { PayloadAction } from 'src/app/shared/models/payload-action.model';
import { LeftNavbarToggleActionTypes } from '../actions/left-navbar.actions';

export interface State {
    open: boolean;
}

export const initialState: State = {
    open: false
};

export function LeftNavbarReducer(state = initialState, action: PayloadAction): State {
    switch (action.type) {
      case LeftNavbarToggleActionTypes.leftNavbarToggleClicked: {
        return {
            ...state,
            open: !state.open
        };
      }

      default: {
        return state;
      }
    }
}
