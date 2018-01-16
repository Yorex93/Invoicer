import React from 'react';
import { StyleSheet, TouchableNativeFeedback, Modal, BackHandler, Dimensions, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Container, Content, Header, Title, Form, Text, View, Icon, ListItem, Grid, List, Col, Item, Input, Label, Left, Right, Center, Button, Toast, Card, CardItem, Body } from 'native-base';
import { myStyles } from '../../container/styles';
import { updateCurrentInvoice, saveInvoiceToDraft, saveInvoice } from '../../../reducers/actions';

const style = myStyles.cardStyles;


class NewInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvoiceDateVisible: false,
            isInvoiceDueDateVisible: false,
            saveToDraftModal: false,
            addItemModal: false,
            showDeleteItemModal: false,
            showSaveToDraftModal: false,
            deleteItemId: null,
            isEdit: false,
            invoiceId: '',
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
            itemDescription: '',
            itemUnitCost: '',
            itemQuantity: ''

        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }


    componentDidMount() {
        // console.log(this.props.navigation.state);
        // if (this.props.navigation.state.params.editInvoice) {
        //     const invoice = this.props.navigation.state.params.editInvoice;
        //     const { invoiceNumber, clientName, clientCountry, clientCity, clientAddress, billTo, invoiceItems, invoiceNotes } = invoice;
        //     const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : '';
        //     const invoiceDueDate = invoice.invoiceDueDate !== '' ? new Date(invoice.invoiceDueDate) : '';
        //     const invoiceId = invoice.id;
        //     this.setState({ invoiceNumber, invoiceId, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes, isEdit: true });
        // } else {
            this.setState({ invoiceId: this.props.DraftsLength });
            const { invoiceNumber, clientName, clientCountry, clientCity, clientAddress, billTo, invoiceItems, invoiceNotes } = this.props.EditInvoice;
            const invoiceDate = this.props.EditInvoice.invoiceDate !== '' ? new Date(this.props.EditInvoice.invoiceDate) : '';
            const invoiceDueDate = this.props.EditInvoice.invoiceDueDate !== '' ? new Date(this.props.EditInvoice.invoiceDueDate) : '';
            this.setState({ invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes });       
        //}
    }

    componentWillUpdate(props) {

        // if (props.navigation.state.params.editInvoice) {
        //     const invoice = props.navigation.state.params.editInvoice;
        //     const { invoiceNumber, clientName, clientCountry, clientCity, clientAddress, billTo, invoiceItems, invoiceNotes } = invoice;
        //     const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : '';
        //     const invoiceDueDate = invoice.invoiceDueDate !== '' ? new Date(invoice.invoiceDueDate) : '';
        //     const invoiceId = invoice.id;
        //     this.setState({ invoiceNumber, invoiceId, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes, isEdit: true });
        // } else {
        //     this.setState({ invoiceId: props.DraftsLength });
        //     const { invoiceNumber, clientName, clientCountry, clientCity, clientAddress, billTo, invoiceItems, invoiceNotes } = props.EditInvoice;
        //     const invoiceDate = props.EditInvoice.invoiceDate !== '' ? new Date(props.EditInvoice.invoiceDate) : '';
        //     const invoiceDueDate = props.EditInvoice.invoiceDueDate !== '' ? new Date(props.EditInvoice.invoiceDueDate) : '';
        //     this.setState({ invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes });       
        // }

        // console.log(props);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler = () => {
        //this.showSaveToDraft();
        const { invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes } = this.state;
        if (invoiceNumber || invoiceDate || invoiceDueDate || clientName || clientAddress || clientCountry || clientCity || billTo || invoiceItems.length > 0 || invoiceNotes) {
            Alert.alert(
                'Save this invoice to drafts?',
                null,
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'Yes', onPress: () => { this.saveToDraft(); } },
                  { text: 'No', onPress: () => { this.clearUpdateInvoice(); this.props.navigation.navigate('Home'); } },
                ],
                { cancelable: true }
              );
            return true;
        }
        return false;
    }


    deleteAllItems = () => {
        Alert.alert(
            'Clear Items List?',
            null,
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'Yes', onPress: () => { this.setState({ invoiceItems: [] }); this.updateInvoice(); } },
            ],
            { cancelable: true }
          );
    }

    updateInvoice = () => {
        const { invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes } = this.state;
        const invoice = { invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress: clientAddress.trim(), clientCountry, clientCity, billTo, invoiceItems, invoiceNotes };

        this.props.updateCurrentInvoice(invoice);
    };


    showSaveToDraft = () => {
        this.setState({ showSaveToDraftModal: true });
    }

    saveToDraft = () => {
        const { invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes } = this.state;
        const invoice = { invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress: clientAddress.trim(), clientCountry, clientCity, billTo, invoiceItems, invoiceNotes };

        this.props.saveInvoiceToDraft(invoice);
        this.clearUpdateInvoice();
        this.props.navigation.navigate('Home', { savedDraft: true });
    }

    clearUpdateInvoice = () => {
       const invoice = {
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
            itemDescription: '',
            itemUnitCost: '',
            itemQuantity: ''
        };

        this.props.updateCurrentInvoice(invoice);
        this.cleanSlate();
    }


    cleanSlate = () => {
        this.setState({ 
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
            itemDescription: '',
            itemUnitCost: '',
            itemQuantity: '' 
        });
    }


    addItem = () => {
        const { itemDescription, itemQuantity, itemUnitCost } = this.state;

        if (itemDescription !== '' && itemQuantity !== '' && itemUnitCost !== '') {
            const invoiceItems = this.state.invoiceItems;
            const newItem = { itemDescription, itemQuantity, itemUnitCost, id: invoiceItems.length };
            invoiceItems.push(newItem);
            this.setState({ invoiceItems });
            this.setState({ 
                addItemModal: false,
                itemDescription: '',
                itemUnitCost: '',
                itemQuantity: '',
             }); 
        }

        this.updateInvoice();
    }

    showDeleteItemModal = (id) => {
        //this.setState({ deleteItemId: id });
        Alert.alert(
            'Delete this Item?',
            null,
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'Yes', onPress: () => { this.deleteItem(id); } },
            ],
            { cancelable: true }
          );
    }


    deleteItem = (id) => {
        let invoiceItems = this.state.invoiceItems;
        const toDelete = new Set([id]);
        invoiceItems = invoiceItems.filter(obj => !toDelete.has(obj.id));
        this.setState({ invoiceItems });
        this.updateInvoice();
    }


    saveAndContinue = () => {
        const { invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress, clientCountry, clientCity, billTo, invoiceItems, invoiceNotes } = this.state;
        
        if (invoiceNumber && invoiceDate && invoiceDueDate && clientName && clientAddress && clientCountry && clientCity && billTo && invoiceItems.length > 0 && invoiceNotes) {
            const invoiceId = this.props.SavedInvoiceLength;
            const createdAt = new Date();
            const updatedAt = new Date();
            const invoice = { invoiceId, createdAt, updatedAt, invoiceNumber, invoiceDate, invoiceDueDate, clientName, clientAddress: clientAddress.trim(), clientCountry, clientCity, billTo, invoiceItems, invoiceNotes };
            this.props.saveInvoice(invoice);

            this.clearUpdateInvoice();
            this.props.navigation.navigate('InvoiceSummary', { invoice });
        } else {
            alert('Some fields have not been given values');
        }
    }


    setCleanSlate = () => {
        Alert.alert(
            'Fresh Slate?',
            null,
            [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: () => { this.cleanSlate(); } },
            ],
            { cancelable: true }
        ); 
    }

    renderItems = () => 
             (
            <Content>
            <List>
            <ListItem style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 0 }}>
            <Left>
        
                <Button 
                    transparent
                    onPress={() => { this.setState({ addItemModal: true }); }}
                    
                >
                <Icon name='add-circle' style={{ color: 'green', fontSize: 32 }} />
                <Text>Add new item</Text>
                </Button>
            </Left>
    
            </ListItem>

            {
                this.state.invoiceItems.map(item => (
                    <ListItem
                        key={item.id.toString()}
                        style={{ paddingTop: 5, paddingBottom: 0, marginLeft: 0 }}
                    >
                        <Grid>
                            <Col style={{ width: '20%' }}>
                                <Button 
                                    transparent
                                    onPress={() => { this.showDeleteItemModal(item.id); }}
                                >
                                    <Icon name='trash' style={{ color: 'red', fontSize: 32 }} />
                                </Button>
                            </Col>
                            <Col style={{ width: '50%' }}>
                                <Text note style={styles.itemDescription}>{item.itemDescription}</Text>
                            </Col>

                            <Col>
                                <Text style={styles.itemTotalCost}>{(item.itemUnitCost * item.itemQuantity).toFixed(2)}</Text>
                                <Text note style={styles.itemUnitCost}>{parseInt(item.itemUnitCost, 10).toFixed(2)} x {item.itemQuantity}</Text>
                            </Col>

                        </Grid>
                    </ListItem>
                ))
            }
            <ListItem style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 0 }}>
                <Grid>
                    <Col style={{ width: '40%' }}>
                        <Button 
                            transparent
                            onPress={() => { this.deleteAllItems(); }}
                        >
                            <Icon name='trash' style={{ color: 'red', fontSize: 32 }} />
                            <Text>Delete all</Text>
                        </Button>
                    </Col>
                    <Col style={{ width: '20%' }} />

                    <Col>
                        <Text style={{ fontSize: 16, alignSelf: 'flex-end' }}>
                            { this.state.invoiceItems.length > 0 ? this.state.invoiceItems.map(item => parseInt(item.itemUnitCost * item.itemQuantity, 10)).reduce((prev, next) => prev + next).toFixed(2) : '' }
                        </Text>
                    </Col>

                </Grid>
    
            </ListItem>
             
            </List>
            </Content>
        );


    render() {
        return (
                <Container>
                    <Header
                        androidStatusBarColor={'#006600'}
                        style={{ backgroundColor: '#006600' }}
                    >
                        <Left>
                            <Button 
                                transparent 
                                onPress={() => { this.updateInvoice(); this.props.navigation.goBack(null); }}
                            >
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Create Invoice</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => { this.setCleanSlate(); }}>
                                <Icon name="close" />
                            </Button>
                            <Button transparent onPress={() => { this.saveAndContinue(); }}>
                                <Icon name="checkmark" />
                            </Button>
                        </Right>
                    </Header>

                    <Content style={myStyles.generalContent.content}>
                        <Card style={style.card}>
                            <CardItem header style={style.cardHeader}>
                                <Text style={style.cardHeaderText}>Client Details</Text>
                            </CardItem>
                            <CardItem>
                                <Content>
                                    <Item stackedLabel>
                                        <Label>Client Company Name</Label>
                                        <Input 
                                            style={styles.input} 
                                            value={this.state.clientName}
                                            onChangeText={(clientName) => { this.setState({ clientName }); this.updateInvoice(); }}
                                            
                                        />
                                    </Item>

                                    <Item stackedLabel>
                                        <Label>Bill to</Label>
                                        <Input 
                                            style={styles.input} 
                                            value={this.state.billTo}
                                            onChangeText={(billTo) => { this.setState({ billTo }); this.updateInvoice(); }}
                                            
                                        />
                                    </Item>

                                    <Item stackedLabel>
                                        <Label>Address</Label>
                                        <Input 
                                            style={{ fontSize: 15 }} 
                                            value={this.state.clientAddress}
                                            onChangeText={(clientAddress) => { this.setState({ clientAddress }); this.updateInvoice(); }}
                                            multiline
                                            numberOfLines={2}
                                        />
                                    </Item>

                                    <Grid style={{ marginTop: 10 }}>
                                        <Col>
                                            <Content>
                                            <Item stackedLabel>
                                                <Label>City</Label>
                                                <Input 
                                                    style={styles.input} 
                                                    value={this.state.clientCity}
                                                    onChangeText={(clientCity) => { this.setState({ clientCity }); this.updateInvoice(); }}
                                                    
                                                />
                                            </Item>
                                            </Content>
                                        </Col>

                                        <Col>
                                            <Content>
                                            <Item stackedLabel>
                                                <Label>Country</Label>
                                                <Input 
                                                    style={styles.input} 
                                                    value={this.state.clientCountry}
                                                    onChangeText={(clientCountry) => { this.setState({ clientCountry }); this.updateInvoice(); }}
                                                    
                                                />
                                            </Item>
                                            </Content>
                                        </Col>
                                    </Grid>
                                 </Content>
                            </CardItem>

                        </Card>


                        <Card style={style.card}>
                            <CardItem header style={style.cardHeader}>
                                <Body>
                                <Text style={style.cardHeaderText}>Invoice Details</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Content>
                                    <Item stackedLabel>
                                        <Label>Invoice No.</Label>
                                        <Input 
                                            style={styles.input} 
                                            value={this.state.invoiceNumber}
                                            onChangeText={(invoiceNumber) => { this.setState({ invoiceNumber }); this.updateInvoice(); }}
                                            
                                        />
                                    </Item>
                                    <Grid style={{ marginTop: 10 }}>
                                        <Col>
                                            <Content>
                                                <Item stackedLabel>
                                                    <Label>Invoice Date.</Label>
                                                    <TouchableNativeFeedback 
                                                        onPress={() => { this.setState({ isInvoiceDateVisible: true }); }}
                                                    >
                                                        <View style={styles.datePickerBox} >
                                                            <Text style={styles.dateText}> 
                                                                {this.state.invoiceDate !== '' ? moment(this.state.invoiceDate).format('DD/MMM/YYYY') : ''}
                                                            </Text>
                                                        </View>
                                                    </TouchableNativeFeedback>
                                                </Item>
                                            </Content>
                                        </Col>

                                        <Col>
                                            <Content>
                                                <Item stackedLabel>
                                                    <Label>Due Date.</Label>
                                                    <TouchableNativeFeedback 
                                                        onPress={() => { this.setState({ isInvoiceDueDateVisible: true }); console.log('here'); }}
                                                    >
                                                        <View style={styles.datePickerBox} >
                                                            <Text style={styles.dateText}> 
                                                                {this.state.invoiceDueDate !== '' ? moment(this.state.invoiceDueDate).format('DD/MMM/YYYY') : ''}
                                                            </Text>
                                                        </View>
                                                    </TouchableNativeFeedback>
                                                </Item>
                                            </Content>
                                        </Col>
                                    </Grid>
                                </Content>
                            </CardItem>
                        </Card>

                        <Card style={style.card}>
                            <CardItem header style={style.cardHeader}>
                                <Body>
                                <Text style={style.cardHeaderText}>Item Details</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                {this.renderItems()}
                            </CardItem>
                        </Card>


                        <Card style={style.card}>
                            <CardItem header style={style.cardHeader}>
                                <Body>
                                <Text style={style.cardHeaderText}>Other Details</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Content>
                                    <Item stackedLabel>
                                        <Label>Notes</Label>
                                        <Input 
                                            style={{ lineHeight: 20, fontSize: 15 }} 
                                            value={this.state.invoiceNotes}
                                            onChangeText={(invoiceNotes) => { this.setState({ invoiceNotes }); this.updateInvoice(); }}
                                            multiline
                                            
                                        />
                                    </Item>
                                </Content>
                            </CardItem>
                        </Card>


                        <DateTimePicker
                            isVisible={this.state.isInvoiceDateVisible}
                            onConfirm={(date) => { this.setState({ invoiceDate: date, isInvoiceDateVisible: false }); this.updateInvoice(); }}
                            onCancel={() => { this.setState({ isInvoiceDateVisible: false }); }}
                            date={this.state.invoiceDate !== '' ? this.state.invoiceDate : new Date()}
                            maximumDate={this.state.invoiceDueDate !== '' ? this.state.invoiceDueDate : undefined}
                        />

                        <DateTimePicker
                            isVisible={this.state.isInvoiceDueDateVisible}
                            onConfirm={(date) => { this.setState({ invoiceDueDate: date, isInvoiceDueDateVisible: false }); this.updateInvoice(); }}
                            onCancel={() => { this.setState({ isInvoiceDueDateVisible: false }); }}
                            date={this.state.invoiceDueDate !== '' ? this.state.invoiceDueDate : new Date()}
                            minimumDate={this.state.invoiceDate !== '' ? this.state.invoiceDate : new Date()}
                        />


                        <Modal 
                            animationType={'fade'} 
                            transparent
                            visible={this.state.addItemModal}
                            onRequestClose={() => { this.setState({ addItemModal: false }); }}

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
                                            <Text style={{ fontWeight: 'bold' }}>Add New Item</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Content>
                                            <Item stackedLabel error={this.state.itemDescription.trim() === ''}>
                                                <Label>Item Description</Label>
                                                <Input 
                                                    style={{ lineHeight: 15, fontSize: 14 }} 
                                                    value={this.state.itemDescription}
                                                    onChangeText={(itemDescription) => { this.setState({ itemDescription }); }}
                                                    multiline
                                                    
                                                />
                                            </Item>

                                            <Grid style={{ marginTop: 10 }}>
                                                <Col>
                                                    <Content>
                                                    <Item stackedLabel error={this.state.itemUnitCost.trim() === ''}>
                                                        <Label>Unit Cost</Label>
                                                        <Input 
                                                            style={{ lineHeight: 15, fontSize: 14 }}
                                                            value={this.state.itemUnitCost}
                                                            onChangeText={(itemUnitCost) => { this.setState({ itemUnitCost }); }}
                                                            keyboardType='numeric'
                                                        />
                                                    </Item>
                                                    </Content>
                                                </Col>

                                                <Col>
                                                    <Content>
                                                    <Item stackedLabel error={this.state.itemQuantity.trim() === ''}>
                                                        <Label>Quantity</Label>
                                                        <Input 
                                                            style={{ lineHeight: 15, fontSize: 14 }}
                                                            value={this.state.itemQuantity}
                                                            onChangeText={(itemQuantity) => { this.setState({ itemQuantity }); }}
                                                            keyboardType='numeric'
                                                        />
                                                    </Item>
                                                    </Content>
                                                </Col>
                                            </Grid>
                                            </Content>
                                        </CardItem>
                                        <CardItem footer>
                                    
                                            <Left>
                                                <Button transparent onPress={() => { this.addItem(); }}>
                                                    <Text>Add</Text>
                                                </Button>
                                            </Left>
                                            <Right>
                                                <Button transparent onPress={() => { this.setState({ addItemModal: false }); }}>
                                                    <Text>Cancel</Text>
                                                </Button>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </Content>
                            </View>
                            </View>
                        </Modal>


                    </Content>
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
        EditInvoice: state.EditInvoice,
        DraftsLength: state.Drafts.length,
        SavedInvoiceLength: state.InvoiceList.length,
    });

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateCurrentInvoice, saveInvoiceToDraft, saveInvoice }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
