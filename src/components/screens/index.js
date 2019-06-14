import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import HomeScreen from './Home/index';
import HistoryScreen from './Home/history';
import DraftsScreen from './Home/drafts';
import SideBar from './Sidebar/index.js';
import SettingsList from './Settings/settingsList';
import InvoiceSettings from './Settings/invoiceSettings';
import CompanySettings from './Settings/companySettings';
import NewInvoice from './Home/newInvoice';
import invoiceSummary from './Home/invoiceSummary';
import invoicePreview from './Home/invoicePreview';
import styles from '../container/styles';

const ScreenRouter = DrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Drafts: { screen: DraftsScreen },
        History: { screen: HistoryScreen },
        NewInvoiceRoute: {
            screen: StackNavigator(
                {
                    NewInvoice: { screen: NewInvoice },
                    InvoicePreview: { screen: invoicePreview },
                },
                {
                    navigationOptions: { header: null }
                }
                ),
                navigationOptions: () => ({
                    drawerLockMode: 'locked-closed'
                  })
                
        },
        InvoiceSummary: { screen: invoiceSummary, navigationOptions: () => ({ drawerLockMode: 'locked-closed' }) }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#19b800',
            },
            headerTitleStyle: { color: 'white' },
        },

        contentComponent: props => <SideBar {...props} />
    }
);


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


export const MainRouter = StackNavigator(
    {
        General: {
            screen: ScreenRouter,
        },
        SettingsScreen: {
            screen: SettingsNavigator,
        },
    },
    {
        navigationOptions: {
            header: null,
        }
    }
);
