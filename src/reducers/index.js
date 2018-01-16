import invoiceReducer from './invoice';
import invoiceSettingsReducer from './invoiceSettings';
import companySettingsReducer from './companySettings';
import editInvoiceReducer from './editInvoice';
import draftsReducer from './drafts';
import userReducer from './user';

export default {
    InvoiceList: invoiceReducer,
    InvoiceSettings: invoiceSettingsReducer,
    CompanySettings: companySettingsReducer,
    CurrentUser: userReducer,
    EditInvoice: editInvoiceReducer,
    Drafts: draftsReducer,
};

