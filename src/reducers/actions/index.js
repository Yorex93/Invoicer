import {
    AUTHENTICATE_USER,
    LOGOUT_USER,
    UPDATE_COMPANY_SETTINGS,
    UPDATE_CURRENT_INVOICE,
    UPDATE_INVOICE_SETTINGS,
    SAVE_INVOICE_TO_DRAFT,
    SAVE_INVOICE,
    DELETE_INVOICE,
    DELETE_DRAFT,
    EMPTY_DRAFTS,
    EMPTY_INVOICES,
    EMPTY_COMPANY_SETTINGS,
    EMPTY_CURRENT_INVOICE,
    EMPTY_INVOICE_SETTINGS
} from './constants';

export const authUser = (user) => ({
        type: AUTHENTICATE_USER,
        user
    });

export const logOutUser = () => ({
        type: LOGOUT_USER,
    });

export const updateCompanySettings = (settings) => ({
        type: UPDATE_COMPANY_SETTINGS,
        settings
    });

export const updateInvoiceSettings = (settings) => ({
    type: UPDATE_INVOICE_SETTINGS,
    settings
});

    
export const updateCurrentInvoice = (invoice) => ({
        type: UPDATE_CURRENT_INVOICE,
        invoice
    });

export const saveInvoiceToDraft = (invoice) => ({
    type: SAVE_INVOICE_TO_DRAFT,
    invoice
});


export const saveInvoice = (invoice) => ({
    type: SAVE_INVOICE,
    invoice
});

export const deleteInvoice = (id) => ({
    type: DELETE_INVOICE,
    id
});

export const deleteDraft = (id) => ({
    type: DELETE_DRAFT,
    id
});


export const emptyDraft = () => ({
    type: EMPTY_DRAFTS
});

export const emptyInvoice = () => ({
    type: EMPTY_INVOICES,
});

export const emptySettings = () => ({
    type: EMPTY_COMPANY_SETTINGS
});

export const emptyInvoiceSettings = () => ({
    type: EMPTY_INVOICE_SETTINGS
});

export const emptyCurrentInvoice = () => ({
    type: EMPTY_CURRENT_INVOICE,
    invoice: {
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
        
    }
});

