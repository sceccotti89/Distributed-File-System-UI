import { PayloadAction } from 'src/app/shared/models/payload-action.model';
import { DocumentActionTypes } from '../actions/document.actions';

export interface State {
    view: boolean;
}

export const initialState: State = {
    view: false,
};

export function DocumentReducer(state = initialState, action: PayloadAction): State {
    switch (action.type) {
      case DocumentActionTypes.documentView: {
        return action.payload;
      }

      default: {
        return state;
      }
    }
}
