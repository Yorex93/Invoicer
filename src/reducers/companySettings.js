const initialSettings = {
    companyName: '',
    companyAddress: '',
    companyLogo: '',
    userFullName: ''
};


const companySettingsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case 'UPDATE_COMPANY_SETTINGS':
            return action.settings;

        case 'EMPTY_COMPANY_SETTINGS':
            return {
                companyName: '',
                companyAddress: '',
                companyLogo: '',
                userFullName: ''
            };

        case 'persist/REHYDRATE':
            if (action.payload) {
                return action.payload.CompanySettings ? action.payload.CompanySettings : state;
            }
            return state;   

        default:
            return state;
    }
};

export default companySettingsReducer;
