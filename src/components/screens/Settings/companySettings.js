import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, KeyboardAvoidingView, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Item, Input, Label, Left, Right, Center, Button, Text, Toast, Body, Title, Icon, List, ListItem, View, Footer } from 'native-base';
import { SettingsHeader } from '../../container/Header';
import { updateCompanySettings } from '../../../reducers/actions';
import { myStyles } from '../../container/styles';


class CompanySettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            waiting: true,
            modalCompanyName: false,
            modalCompanyAddress: false,
            modalUserFullName: false,
            focusCompanyNameInput: false,
            focusCompanyAddressInput: false,
        };
    }
    componentDidMount() {
        const { companyName, companyAddress, companyLogo, userFullName } = this.props.CompanySettings;
        this.setState({ 
            companyName, 
            companyAddress, 
            companyLogo, 
            userFullName,
            EditCompanyName: companyName, 
            EditCompanyAddress: companyAddress, 
            EditUserFullname: userFullName, 
            waiting: false 
        });
    }

    backKeyPressed = () => {
        this.props.navigation.goBack();
    };

    updateSettings = () => {
        const { companyName, companyAddress, companyLogo, userFullName } = this.state;
        const settings = { companyName, companyAddress, companyLogo, userFullName };

        this.props.updateCompanySettings(settings);
    };

    closeModal = (modal) => {
        if (modal === 'companyName') {
            this.setState({ modalCompanyName: false });
        } else if (modal === 'companyAddress') {
            this.setState({ modalCompanyAddress: false });
        } else if (modal === 'userFullName') {
            this.setState({ modalUserFullName: false });
        }
    };

    saveCompanyName = () => {
       this.setState({ companyName: this.state.EditCompanyName }, function () {
           this.updateSettings();
           this.closeModal('companyName');
       });
    };

    saveCompanyAddress = () => {
        this.setState({ companyAddress: this.state.EditCompanyAddress }, function () {
            this.updateSettings();
            this.closeModal('companyAddress');
        });
    };

    saveUserFullName = () => {
        this.setState({ userFullName: this.state.EditUserFullname }, function () {
            this.updateSettings();
            this.closeModal('userFullName');
        });
    };

    focusCompanyName = () => {
        //this.refs.yyy.focus();
    }

    renderNew =() => (
            <View>
                <ListItem 
                    style={styles.list}
                    button
                    onPress={() => {
                        this.setState({ modalUserFullName: true });
                    }}
                >
                    <Body>
                    <Text>Your Name</Text>
                    <Text note>{this.state.userFullName !== '' ? this.state.userFullName : 'Not set' }</Text>
                    </Body>
                </ListItem>

                <ListItem 
                    style={styles.list} button
                    onPress={() => { 
                        this.setState({ modalCompanyName: true }); 
                        this.focusCompanyName();
                        }}
                >
                    <Body>
                    <Text>Company Name</Text>
                    <Text note>{this.state.companyName !== '' ? this.state.companyName : 'Not set' }</Text>
                    </Body>
                </ListItem>

                <ListItem 
                    style={styles.list}
                    button
                    onPress={() => {
                        this.setState({ modalCompanyAddress: true });
                    }}
                >
                    <Body>
                    <Text>Company Address</Text>
                    <Text note>{this.state.companyAddress !== '' ? this.state.companyAddress : 'Not set' }</Text>
                    </Body>
                </ListItem>


                {/*
                    Modal for company Name
                */}
                <Modal 
                    animationType={'fade'} 
                    transparent
                    visible={this.state.modalCompanyName}
                    onRequestClose={() => { this.closeModal('companyName'); }}

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
                                    <Text style={{ fontWeight: 'bold' }}>Company Name</Text>
                                </CardItem>
                                <CardItem>
                                <Body>
                                    <Item underline>
                                        <Input
                                            value={this.state.EditCompanyName} 
                                            placeholder='E.g Great company ltd'
                                            placeholderTextColor={myStyles.faintTextColor}
                                            onChangeText={(companyName) => { this.setState({ EditCompanyName: companyName }); }}
                                        />
                                    </Item>
                                </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Left />
                                    <Body>
                                        <Button transparent onPress={() => { this.saveCompanyName(); }}>
                                            <Text>Save</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => { this.closeModal('companyName'); }}>
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


                <Modal 
                    animationType={'fade'} 
                    transparent
                    visible={this.state.modalCompanyAddress}
                    onRequestClose={() => { this.closeModal('companyAddress'); }}

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
                                    <Text style={{ fontWeight: 'bold' }}>Company Address</Text>
                                </CardItem>
                                <CardItem>
                                <Body>
                                    <Item underline>
                                        <Input
                                            value={this.state.EditCompanyAddress} 
                                            placeholder='E.g with town, city and state'
                                            placeholderTextColor={myStyles.faintTextColor}
                                            multiline
                                            onChangeText={(companyAddress) => { this.setState({ EditCompanyAddress: companyAddress }); }}
                                        />
                                    </Item>
                                </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Left />
                                    <Body>
                                        <Button transparent onPress={() => { this.saveCompanyAddress(); }}>
                                            <Text>Save</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => { this.closeModal('companyAddress'); }}>
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


                <Modal 
                    animationType={'fade'} 
                    transparent
                    visible={this.state.modalUserFullName}
                    onRequestClose={() => { this.closeModal('companyAddress'); }}

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
                                    <Text style={{ fontWeight: 'bold' }}>Your Name</Text>
                                </CardItem>
                                <CardItem>
                                <Body>
                                    <Item underline>
                                        <Input
                                            value={this.state.EditUserFullname} 
                                            placeholder='E.g John Doe'
                                            placeholderTextColor={myStyles.faintTextColor}
                                            onChangeText={(userFullName) => { this.setState({ EditUserFullname: userFullName }); }}
                                        />
                                    </Item>
                                </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Left />
                                    <Body>
                                        <Button transparent onPress={() => { this.saveUserFullName(); }}>
                                            <Text>Save</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => { this.closeModal('userFullName'); }}>
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

            </View>
        );

    render() {
        return (
            <Container>
                <SettingsHeader title="Company Details" onBackPressed={this.backKeyPressed} />

                {
                    !this.state.waiting ?
                        <Content style={myStyles.generalContent.content}>
                            {this.renderNew()}
                        </Content>
                        :
                        <Content />
                }

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
       CompanySettings: state.CompanySettings
   });


const mapDispatchToProps = (dispatch) => bindActionCreators({ updateCompanySettings }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanySettings);
