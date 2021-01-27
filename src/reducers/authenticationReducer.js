export const authenticationReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                error: '',
                userInfo: action.payload,
            }
            case "FETCH_PROCESSING":
            return {
                ...state,
                loading: true,
            }
        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: 'Something went wrong',
                userInfo: {},
            }
        case "AUTHENTICATE_USER":
            return {
                ...state,
                isAuth: action.payload.isAuth,
            }
        case "LOGOUT_USER":
            return {
                ...state,
                isAuth: action.payload.isAuth,
            }
        default:
            return state;
    }
};