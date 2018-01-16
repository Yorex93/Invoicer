const initialUser = [];


const userReducer = (state = initialUser, action) => {
    //console.log(action);
    switch (action.type) {
        case 'AUTHENTICATE_USER':
            return [
                action.user
            ];

        case 'LOGOUT_USER':
            return [];

        case 'persist/REHYDRATE':
            if (action.payload) {
                return action.payload.CurrentUser ? action.payload.CurrentUser : state;
            }
            return state;

        default:
            return state;
    }
};

export default userReducer;

