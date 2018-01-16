import { StackNavigator } from 'react-navigation';
import SettingsList from './settingsList';
import InvoiceSettings from './invoiceSettings';
import CompanySettings from './companySettings';


const SettingsNavigator = StackNavigator(
    {
        Settings: {
            screen: SettingsList,
        },
        CompanySettings: {
            screen: CompanySettings,
        },
        InvoiceSettings: {
            screen: InvoiceSettings
        }
    },

    {
        navigationOptions: {
            header: null
        }
    }

    );

export default SettingsNavigator;
