import React from 'react';
import { StyleSheet, TouchableNativeFeedback, Modal, BackHandler, Dimensions } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-root-toast';
import { bindActionCreators } from 'redux';
import { Container, Content, Fab, Text, View, Icon, ListItem, Grid, List, Col, Item, Input, Label, Left, Right, Center, Button, Card, CardItem, Body } from 'native-base';
import { SettingsHeader } from '../../container/Header';
import { myStyles } from '../../container/styles';
import { updateCurrentInvoice, saveInvoiceToDraft } from '../../../reducers/actions';
import Loader from '../../loader';
import { INVOICE_API } from '../../../constants';


class InvoicePreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                emailTo: ''
            
            },
            fabActive: false,
            emailTo: '',
            loading: false,
            loadingText: '',
            emailModal: false
        };
    }

    componentDidMount() {
        //console.log(this.props.navigation.state.params.invoice);
        this.setState({ invoice: this.props.navigation.state.params.invoice });
    }

    emailInvoice = () => {
        const { companyName, companyAddress, companyLogo, userFullName } = this.props.CompanySettings;

        if (companyName && companyAddress && userFullName) {
        if (this.state.emailTo) {
            this.setState({ emailModal: false });
            this.setState({ loading: true, loadingText: 'Please wait while we mail your invoice' });
            
            const token = this.props.CurrentUser[0].token;
            const { companyName, companyAddress, companyLogo, userFullName } = this.props.CompanySettings;

            fetch(INVOICE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    invoiceNumber: this.state.invoice.invoiceNumber,
                    invoiceDate: this.state.invoice.invoiceDate,
                    invoiceDueDate: this.state.invoice.invoiceDueDate,
                    clientName: this.state.invoice.clientName,
                    billTo: this.state.invoice.billTo,
                    clientAddress: this.state.invoice.clientAddress,
                    clientCity: this.state.invoice.clientCity,
                    clientCountry: this.state.invoice.clientCountry,
                    invoiceItems: this.state.invoice.invoiceItems,
                    invoiceNotes: this.state.invoice.invoiceNotes,
                    clientEmail: this.state.emailTo,
                    companyName,
                    companyAddress,
                    companyLogo,
                    userFullName,
                    vat: this.props.InvoiceSettings.vat
                }),
            }).then(resp => resp.json())
            .then(response => {
                console.log(response);
                if (response.error) {
                    this.setState({ loading: false, loadingText: '' });
                    let errorMsg = 'An error occured while sending, please try again';
                    if (response.error.client_email) {
                        errorMsg = 'Please enter a valid email address';
                    } 
                    Toast.show(errorMsg, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        backgroundColor: '#ff000090'
                    });
                } else if (response.success) {
                    this.setState({ loading: false, loadingText: '' });
                    Toast.show('Your invoice has been sent', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                        shadow: false,
                        animation: true,
                        backgroundColor: '#007d00cc'
                    });
                } else {
                    this.setState({ loading: false, loadingText: '' });
                    Toast.show('There was an error, try again later', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        backgroundColor: '#ff000090'
                    });
                }
            }).catch(error => {
                console.log(`There was an error ${error}`);
            });
        } else {
            Toast.show('Please enter a valid email address', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: '#ff000090'
            });
        }
    } else {
        this.setState({ emailModal: false });
        Toast.show('Some company details are still missing, kindly update them in company settings', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            backgroundColor: '#ff000090'
        });
    }
    }

    render() {
        const inv = this.state.invoice;
        return (
            <Container>
                <Loader loading={this.state.loading} loadingText={this.state.loadingText} />
                <SettingsHeader title="Invoice Preview" onBackPressed={() => { this.props.navigation.goBack(null); }} />

                <Content style={myStyles.generalContent.content}>
                    <Card style={myStyles.cardStyles.card}>
                        <CardItem header style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, color: '#666666' }}>INVOICE #{inv.invoiceNumber}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Client</Text>
                                <Text note>{inv.clientName}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Bill To</Text>
                                <Text note>{inv.billTo}</Text>
                            </Body>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Client Address</Text>
                                <Text note>{inv.clientAddress}</Text>
                                <Text note>{inv.clientCity} {inv.clientCountry}</Text>
                            </Body>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Invoice Date</Text>
                                <Text note>{inv.invoiceDate !== '' ? moment(inv.invoiceDate).format('DD/MMM/YYYY') : ''}</Text>
                            </Body>
                        </CardItem>  

                        <CardItem>
                            <Body>
                                <Text>Invoice Due Date</Text>
                                <Text note>{inv.invoiceDueDate !== '' ? moment(inv.invoiceDueDate).format('DD/MMM/YYYY') : ''}</Text>
                            </Body>
                        </CardItem>  

                        <CardItem style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                            <Body>
                                <Text>Invoice Items</Text>
                            </Body>
                        </CardItem> 

                        {
                            inv.invoiceItems.map(item => (
                            <CardItem key={item.id.toString()} style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                                <Body>
                                    <Text note>
                                        {item.itemDescription}
                                    </Text>
                                </Body>
                                <Right>
                                    <Text note>
                                        {parseInt(item.itemUnitCost, 10).toFixed(2)} x {item.itemQuantity}
                                    </Text>
                                    <Text note>
                                        {(item.itemUnitCost * item.itemQuantity).toFixed(2)}
                                    </Text>
                                </Right>
                            </CardItem>
                       
                            ))
                        }

                        <CardItem>
                            <Body>
                                <Text>Total Cost</Text>
                                <Text note>
                                    { inv.invoiceItems.length > 0 ? inv.invoiceItems.map(item => parseInt(item.itemUnitCost * item.itemQuantity, 10)).reduce((prev, next) => prev + next).toFixed(2) : '' }
                                </Text>
                            </Body>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Notes</Text>
                                <Text note>
                                    {inv.invoiceNotes}
                                </Text>
                            </Body>
                        </CardItem>
                  
    
                    </Card>
                </Content>

                <Fab
                    active={this.state.fabActive}
                    direction="down"
                    containerStyle={{ }}
                    style={{ backgroundColor: 'red' }}
                    position="bottomRight"
                    onPress={() => this.setState({ emailModal: true })}
                >
                    <Icon name="mail" />
                </Fab>

                <Modal 
                    animationType={'fade'} 
                    transparent
                    visible={this.state.emailModal}
                    onRequestClose={() => { this.setState({ emailModal: false }); }}
                >
                    <View 
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.75)'
                        }}
                    >
                        <View 
                            style={{ height: 300, width: Dimensions.get('window').width * 0.9 }}
                        >

                                <Content>    
                                    <Card>
                                        <CardItem header>
                                            <Text style={{ fontWeight: 'bold' }}>Email Invoice</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Content>
                                                <Item stackedLabel error={this.state.emailTo.trim() === ''}>
                                                    <Label>Enter email</Label>
                                                    <Input 
                                                        style={{ lineHeight: 15, fontSize: 14 }} 
                                                        value={this.state.emailTo}
                                                        onChangeText={(emailTo) => { this.setState({ emailTo }); }} 
                                                        keyboardType='email-address' 
                                                    />
                                                </Item>
                                            </Content>
                                        </CardItem>
                                        <CardItem footer>
                                            <Left />
                                            <Body>
                                                <Button transparent onPress={() => { this.emailInvoice(); }}>
                                                    <Text>Send</Text>
                                                </Button>
                                            </Body>
                                            <Right>
                                                <Button transparent onPress={() => { this.setState({ emailModal: false }); }}>
                                                    <Text>Cancel</Text>
                                                </Button>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </Content>
                            </View>
                            </View>
                        </Modal>
               
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

const mapStateToProps = (state) => ({
    CurrentUser: state.CurrentUser,
    CompanySettings: state.CompanySettings,
    InvoiceSettings: state.InvoiceSettings
});


export default connect(mapStateToProps, null)(InvoicePreview);
