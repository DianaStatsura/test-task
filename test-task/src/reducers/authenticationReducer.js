import { constants } from '../actions/constants';

export const authentication = (state = {}, action) => {
  switch (action.type) {
    case constants.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
        registered: false
      };
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true
      };
    case constants.REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        registered: false
      };
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: action.user
      };
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        loggingOut: false
      };
    case constants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        loggingOut: true
      };
    // case constants.REFRESHING_TOKEN:
    //   return {
    //     ...state,
    //     pendingRefreshingToken: true,
    //     tokenIsValid: false
    //   };
    // case constants.TOKEN_REFRESHED:
    //   return {
    //     ...state,
    //     pendingRefreshingToken: null,
    //     tokenIsValid: true
    //   };
    default:
      return state;
  }
}

