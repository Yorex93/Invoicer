import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Button, Title, Fab, Content, Icon, View, Card, CardItem, Text, Grid, Col } from 'native-base';
import AppHeader from '../../container/Header';
import { myStyles } from '../../container/styles';


const style = myStyles.cardStyles;

class HomeScreen extends Component {

    static navigationOptions = ({
        title: 'Dashboard',
        tabBarVisible: false,
    });

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false,
            isEditingInvoice: 0
        };
    }

    componentDidMount() {
        const inv = this.props.EditInvoice;
        if (inv.invoiceNumber === ''
        && inv.invoiceDate === ''
        && inv.invoiceDueDate === ''
        && inv.clientName === ''
        && inv.billTo === ''
        && inv.clientAddress === ''
        && inv.clientCity === ''
        && inv.clientCountry === ''
        && inv.invoiceItems.length === 0
        && inv.invoiceNotes === '') {
            this.setState({ isEditingInvoice: 0 });
        } else {
            this.setState({ isEditingInvoice: 1 });
        }
    }


    renderCompEdit = () => (
           <Right>
               <Button
                    transparent style={{ height: 15 }}
                    onPress={() => { this.props.navigation.navigate('CompanySettings'); }}
               >
                   <Icon active name="create" style={{ color: 'white' }} />
                   <Text style={{ color: 'white' }}>Edit</Text>
               </Button>
           </Right>
       );


    render() {
        return (
            <Container>
                <AppHeader
                    title='Dashboard'
                    onLeftIconPressed={() => { this.props.navigation.navigate('DrawerToggle'); }}
                    onRightIconPressed={() => { this.props.navigation.navigate('SettingsScreen'); }}
                    leftIcon="menu"
                    rightIcon="settings"
                />

                <View style={myStyles.generalContent.content}>
                    <Content>
                    <Card style={style.card}>
                        <CardItem header style={style.cardHeader}>
                            <Text 
                                style={style.cardHeaderText}
                            >
                                Welcome {this.props.CurrentUser[0].firstName}
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Grid>
                                    <Col 
                                        style={{ 
                                        backgroundColor: '#fff', 
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center', }}
                                    >
                                        <View>
                                            <Icon name={'create'} style={{ color: 'red' }} />
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 15 }}>Editing</Text>
                                        <Text style={{ color: 'grey', fontSize: 13 }}>{this.state.isEditingInvoice} item</Text>
                                    </Col>
                                    <Col 
                                        style={{ 
                                        backgroundColor: '#fff', 
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center', }}
                                    >
                                        <View>
                                            <Icon name={'folder-open'} style={{ color: 'red' }} />
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 15 }}>Drafts</Text>
                                        <Text style={{ color: 'grey', fontSize: 13 }}>{this.props.Drafts.length} item(s)</Text>
                                    </Col>

                                    <Col 
                                        style={{ 
                                        backgroundColor: '#fff', 
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center', }}
                                    >
                                        <View>
                                            <Icon name={'paper'} style={{ color: 'red' }} />
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 15 }}>Saved</Text>
                                        <Text style={{ color: 'grey', fontSize: 13 }}>{this.props.InvoiceList.length} item(s)</Text>
                                    </Col>

                                </Grid>
                            </Body>
                        </CardItem>

                    </Card>

                    <Card style={style.card}>
                        <CardItem header style={style.cardHeader}>
                            <Body>
                                <Text style={style.cardHeaderText}>Company details</Text>
                            </Body>

                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={myStyles.dashboardStyles.detailsText}>
                                     User: {this.props.CompanySettings.userFullName ? this.props.CompanySettings.userFullName : 'Not set' }
                                </Text>
                                <Text style={myStyles.dashboardStyles.detailsText}> 
                                    Company: {this.props.CompanySettings.companyName ? this.props.CompanySettings.companyName : 'Not set' }
                                </Text>
                                <Text style={myStyles.dashboardStyles.detailsText}> 
                                    Address: {this.props.CompanySettings.companyAddress ? this.props.CompanySettings.companyAddress : 'Not set' }
                                </Text>
                            </Body>
                        </CardItem>

                    </Card>
                    </Content>
                        <Fab
                            active={this.state.fabActive}
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: 'red' }}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate('NewInvoiceRoute', { editInvoice: false })}
                        >
                            <Icon name="create" />
                        </Fab>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => (
    { 
        CurrentUser: state.CurrentUser, 
        CompanySettings: state.CompanySettings,
        Drafts: state.Drafts,
        EditInvoice: state.EditInvoice,
        InvoiceList: state.InvoiceList
    }
);


export default connect(mapStateToProps)(HomeScreen);
