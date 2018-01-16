import React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Center, Button, Text, Toast, Body, Title, Icon, List, ListItem } from 'native-base';
import { SettingsHeader } from '../../container/Header';

class SettingsList extends React.Component {
    render() {
        return (
            <Container>
                <SettingsHeader title="Settings" onBackPressed={() => { this.props.navigation.goBack(null); }} />
                <Content>
                    <List>
                        <ListItem
                            style={styles.list}
                            button
                            onPress={() => { this.props.navigation.navigate('CompanySettings'); }}
                        >
                            <Body>
                                <Text>Company Details </Text>
                            </Body>
                        </ListItem>

                        <ListItem
                            style={styles.list}
                            button
                            onPress={() => { this.props.navigation.navigate('InvoiceSettings'); }}
                        >
                            <Body>
                             <Text>Invoice Settings</Text>
                            </Body>
                        </ListItem>

                        <ListItem style={styles.list} button>
                            <Body>
                                <Text>About App</Text>
                                <Text note>Version 0.0.1</Text>
                            </Body>
                        </ListItem>
                    </List>
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

export default SettingsList;
