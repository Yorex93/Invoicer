import React from 'react';
import { Container, Header, Content, View, Form, Item, Input, Label, Left, Right, Center, Button, Text, Toast, Body, Title , Icon, List, ListItem } from 'native-base';
import { SettingsHeader } from '../../container/Header';

class InvoiceSettings extends React.Component {
    render() {
        return (
            <Container>
                <SettingsHeader 
                    title="Invoice Settings" 
                    onBackPressed={() => { this.props.navigation.navigate.goBack(); }} 
                />
                <Content>
                    <View />
                </Content>
            </Container>
        );

    }

}

const styles = {
    list: {
        paddingLeft: 17,
        marginLeft: 0,
        backgroundColor: 'transparent'
    }
};

export default InvoiceSettings;
