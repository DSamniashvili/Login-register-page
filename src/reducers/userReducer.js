export const userReducer = (state, action) => {
    switch (action.type) {
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