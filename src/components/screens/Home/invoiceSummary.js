import React from 'react';
import { StyleSheet, TouchableNativeFeedback, Modal, BackHandler, Dimensions } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Container, Content, Fab, Text, View, Icon, ListItem, Grid, List, Col, Item, Input, Label, Left, Right, Center, Button, Toast, Card, CardItem, Body } from 'native-base';
import { SettingsHeader } from '../../container/Header';
import { myStyles } from '../../container/styles';
import { updateCurrentInvoice, saveInvoiceToDraft } from '../../../reducers/actions';


class InvoiceSummary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invoice: null,
            fabActive: false,
            emailTo: ''
        };
    }

    componentDidMount() {
        console.log(this.props);
        //this.setState({ invoice: this.props.invoice });
    }


    render() {
        return (
            <Container>
                <View>
                <SettingsHeader title="Invoice Preview" onBackPressed={() => { this.props.navigation.goBack(null); }} />

                <Content style={myStyles.generalContent.content}>
                    <Card style={myStyles.cardStyles.card}>

                    </Card>
                </Content>

                {/* <Fab
                    active={this.state.fabActive}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Icon name="mail" />
                </Fab> */}
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    input: {
        lineHeight: 20,
        fontSize: 15,
        height: 40
    },
    datePickerBox: {
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 35,
        justifyContent: 'center',
        width: '90%',
    },
    dateText: {
        fontSize: 15,
    },
    itemUnitCost: {
        fontSize: 13,
        alignSelf: 'flex-end'
    },
    itemDescription: {
        fontSize: 15,
        alignSelf: 'flex-start'
    },
    itemTotalCost: {
        fontSize: 15,
        alignSelf: 'flex-end'
    }
      
});


export default InvoiceSummary;