import { ActionTypes } from '../actions/file.action';
import { FileObjectView } from 'src/app/shared/models/element.model';
import { PayloadAction } from 'src/app/shared/models/payload-action.model';

export interface State {
    response: FileObjectView;
}

export const initialState: State = {
    response: null
};

export function FileReducer(state = initialState, action: PayloadAction): State {
    switch (action.type) {
      case ActionTypes.getFiles: {
        return {
            response: action.payload
        };
      }

      case ActionTypes.downloadFiles: {
        return {
            response: action.payload
        };
      }

      case ActionTypes.uploadFiles: {
        return {
            response: action.payload
        };
      }

      case ActionTypes.deleteFiles: {
        return {
            response: action.payload
        };
      }

      default: {
        return state;
      }
    }
}
