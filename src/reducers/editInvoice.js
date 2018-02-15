
const initialState = {
    invoiceNumber: '',
    invoiceDate: '',
    invoiceDueDate: '',
    clientName: '',
    billTo: '',
    clientAddress: '',
    clientCity: '',
    clientCountry: '',
    invoiceItems: [],
    invoiceNotes: '',
    
};


const editInvoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_INVOICE':
            return action.invoice;

        case 'EMPTY_CURRENT_INVOICE':
            return {
                invoiceNumber: '',
                invoiceDate: '',
                invoiceDueDate: '',
                clientName: '',
                billTo: '',
                clientAddress: '',
                clientCity: '',
                clientCountry: '',
                invoiceItems: [],
                invoiceNotes: '',
                
            };

        case 'persist/REHYDRATE':
            if (action.payload) {
                return action.payload.EditInvoice ? action.payload.EditInvoice : state;
            }
            return state; 
            

        default:
            return state;
    }
};

export default editInvoiceReducer;
