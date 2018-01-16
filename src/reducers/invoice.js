const initialState = [];

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_INVOICE':
            return [   
                ...state, action.invoice
                ];

        case 'DELETE_INVOICE':
            return state.filter(obj => !(new Set([action.id])).has(obj.invoiceId));
           
        case 'persist/REHYDRATE':
            if (action.payload) {
                return action.payload.InvoiceList ? action.payload.InvoiceList : state;
            }
            return state; 
            

        default:
            return state;
    }
};


export default invoiceReducer;
