import { constants } from '../actions/constants';
import { service } from '../actions/services';

export const actions = {
    login,
    logout,
    register
};

function login(user) {
    return dispatch => {
        dispatch(request(user));

        service.login(user).then(
            res => {
                console.log(res);
                dispatch(success(res));
                return res;
            },
            error => {
                dispatch(failure(error));
            }
        );
    };
    function request(user) {
        return { type: constants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: constants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: constants.LOGIN_FAILURE, error };
    }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        service.register(user)
            .then(
                (res) => {
                    dispatch(success(user));
                    return res;
                },

                error => {
                    dispatch(failure(error));
                }
            );


        function request(user) {
            return { type: constants.REGISTER_REQUEST, user };
        }
        function success(user) {
            return { type: constants.REGISTER_SUCCESS, user };
        }
        function failure(error) {
            return { type: constants.REGISTER_FAILURE, error };
        }
    }
}

function logout() {
    return (dispatch) => {
        service.logout();
        dispatch(success());
    };
    function success() {
        return { type: constants.LOGOUT };
    }
}
