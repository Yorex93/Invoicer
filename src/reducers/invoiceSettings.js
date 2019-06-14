const initialSettings = {
    vat: ''
};

const settingsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case 'UPDATE_INVOICE_SETTINGS':
            return action.settings;

        case 'EMPTY_INVOICE_SETTINGS':
            return initialSettings;

        case 'persist/REHYDRATE':
            if (action.payload) {
                return action.payload.InvoiceSettings ? action.payload.InvoiceSettings : state;
            }
            return state; 
            
        default:
            return state;
    }
};

export default settingsReducer;
