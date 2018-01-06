import {
  CURRENT_VIEW,
  TOGGLE_TIMR_COUNTDOWN,
  TOGGLE_TRACKLIST,
  LOCK_UI,
  UILOCK_DIGIT,
  UILOCK_DIGIT_CLEAR
} from '../actions/types';

const UI_UNLOCK_COMBINATION = '6211';

export default function uiStateReducer(state = {}, action) {
  switch (action.type) {

    case CURRENT_VIEW : {
      return {
        ...state,
        currentView: action.view
      };
    }

    case TOGGLE_TIMR_COUNTDOWN : {
      return {
        ...state,
        timrCountdown: !state.timrCountdown
      };
    }

    case TOGGLE_TRACKLIST: {
      return {
        ...state,
        showTracklist: !state.showTracklist
      };
    }

    case LOCK_UI: {
      return {
        ...state,
        uiIsLocked: true
      };
    }

    case UILOCK_DIGIT: {
      const uiLockDigits = [...state.uiLockDigits, action.digit];
      const rightCombination = uiLockDigits.join('') === UI_UNLOCK_COMBINATION;

      return {
        ...state,
        uiLockDigits: rightCombination ? [] : uiLockDigits,
        uiIsLocked: !rightCombination
      };
    }

    case UILOCK_DIGIT_CLEAR: {
      return {
        ...state,
        uiLockDigits: []
      };
    }
  }

  return state;
}


