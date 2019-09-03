import { PayloadAction } from 'src/app/shared/models/payload-action.model';
import { CheckboxActionTypes } from '../actions/checkbox.actions';

export interface State {
    checked: boolean;
    local: boolean;
    global: boolean;
}

export const initialState: State = {
    checked: false,
    local: false,
    global: false
};

export function CheckboxReducer(state = initialState, action: PayloadAction): State {
    switch (action.type) {
      case CheckboxActionTypes.checkboxClicked: {
        return action.payload;
      }

      default: {
        return state;
      }
    }
}
