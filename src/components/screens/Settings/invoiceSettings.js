import React from 'react';
import { KeyboardAvoidingView, Dimensions, Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-root-toast';
import { Container, Card, Content, View, CardItem, Item, Input, Label, Left, Right, Center, Button, Text, Body, Title , Icon, List, ListItem } from 'native-base';
import { SettingsHeader } from '../../container/Header';
import { authUser, updateInvoiceSettings } from '../../../reducers/actions';
import { myStyles } from '../../container/styles';
import Loader from '../../loader';

class InvoiceSettings extends React.Component {

    constructor() {
        super();

        this.state = {
            vat: '',
            modalVat: false,
            editVat: '',
            focusVatInput: ''
        };
    }

    componentDidMount() {
        this.setState({ vat: this.props.InvoiceSettings.vat, editVat: this.props.InvoiceSettings.vat });
    }

    saveVat = () => {
        if (parseInt(this.state.editVat, 10) > 50) {
            this.setState({ modalVat: false });
            Toast.show('Vat too high, please use a lower figure', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: '#ff000090'
            });

            return;
        }

            this.updateSettings();
            this.setState({ modalVat: false });
    };

    updateSettings = () => {
        const settings = {
            vat: this.state.editVat.trim()
        };
        
        if (this.state.editVat.trim()) {
            if (isNaN(this.state.editVat.trim())) {
                Toast.show('Vat must be a number', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    backgroundColor: '#ff000090'
                });
                this.setState({ editVat: '' });
            } else {
                this.setState({ vat: this.state.editVat });
                this.props.updateInvoiceSettings(settings);
            }
        } else {
            this.props.updateInvoiceSettings(settings);
        }
        
    }


    render() {
        return (
            <Container>
                <SettingsHeader 
                    title="Invoice Settings" 
                    onBackPressed={() => { this.props.navigation.goBack(); }} 
                />


                <Content>
                    <View>
                        <ListItem 
                            style={styles.list}
                            button
                            onPress={() => {
                                this.setState({ modalVat: true });
                            }}
                        >
                            <Body>
                            <Text>Vat(%)</Text>
                            <Text note>{this.state.vat !== '' ? this.state.vat : 'Not set' }</Text>
                            </Body>
                        </ListItem>
                    </View>
                </Content>

                <Modal 
                    animationType={'fade'} 
                    transparent
                    visible={this.state.modalVat}
                    onRequestClose={() => { this.setState({ modalVat: false }); }}

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
                        <KeyboardAvoidingView behaviour='padding'>
                           
                            <Card style={{ height: 200 }}>
                                <CardItem header>
                                    <Text style={{ fontWeight: 'bold' }}>Vat(%)</Text>
                                </CardItem>
                                <CardItem>
                                <Body>
                                    <Item underline>
                                        <Input
                                            value={this.state.editVat} 
                                            placeholder='5'
                                            placeholderTextColor={myStyles.faintTextColor}
                                            onChangeText={(editVat) => { this.setState({ editVat }); }}
                                            keyboardType='numeric'
                                        />
                                    </Item>
                                </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Left />
                                    <Body>
                                        <Button transparent onPress={() => { this.saveVat(); }}>
                                            <Text>Save</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => { this.setState({ modalVat: false }); }}>
                                            <Text>Cancel</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                            
                            </KeyboardAvoidingView>
                            </Content>
                    </View>
                    </View>
                </Modal>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    list: {
        paddingLeft: 17,
        marginLeft: 0,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
    },
  });


const mapStateToProps = (state) => ({
    InvoiceSettings: state.InvoiceSettings,
    CurrentUser: state.CurrentUser
});


const mapDispatchToProps = (dispatch) => bindActionCreators({ updateInvoiceSettings, authUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSettings);
