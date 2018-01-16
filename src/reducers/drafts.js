const initialState = [];

const draftsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_INVOICE_TO_DRAFT':
            return [   
                ...state, action.invoice
                ];

        case 'DELETE_DRAFT':
            return state.filter(obj => !(new Set([action.id])).has(obj.invoiceId));

        case 'EMPTY_DRAFTS':
            return [];

        case 'persist/REHYDRATE':
            if (action.payload) {
                return action.payload.Drafts ? action.payload.Drafts : state;
            }
            return state; 
            

        default:
            return state;
    }
};

export default draftsReducer;
