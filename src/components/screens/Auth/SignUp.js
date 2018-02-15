import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Center, Button, Text, Body, Title , Icon} from 'native-base';
import { StyleSheet, Dimensions, Alert, KeyboardAvoidingView, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authUser, updateCompanySettings } from '../../../reducers/actions';
import Loader from '../../../components/loader';
import { REGISTER_API, USER_API } from '../../../constants';


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            username_has_error: false,
            fullname: '',
            fullname_has_error: false,
            password: '',
            password_has_error: false,
            password_confirm: '',
            password_confirm_has_error: false,
            password_hidden: '',
            hasError: false,
            errors: [],
            loading: false,
            loadingText: ''
        };
    }


    _handleClick = () => {
        //  this.setState({ username: 'gg'})
        // Alert.alert('hi');
        let error = false;
        let error_msg = [];

        if (this.state.username.length < 1) {
            error_msg.push('Username field is empty');
            this.setState({ username_has_error: true });
            error = true;
        }

        if (this.state.fullname.length < 1) {
            error_msg.push('Full Name field is empty');
            this.setState({ fullname_has_error: true });
            error = true;
        }

        if (this.state.password.length < 6) {
            error_msg.push('Password field must be 6 or more characters');
            error = true;
            this.setState({ password_has_error: true });
        }

        if (this.state.password_confirm.length < 1) {
            error_msg.push('Password Confirm field is empty');
            error = true;
            this.setState({ password_confirm_has_error: true });
        }

        if (this.state.password !== this.state.password_confirm) {
            error_msg.push('Passwords do not match');
            error = true;
            this.setState({ password_confirm_has_error: true });
        }


        if (error) {
            const mssg = error_msg.map(msg => msg).join(', ');
            Toast.show(error_msg[0], {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: '#00000090'
            });
            return false;
        }

        return this.register();
    };

    register = () => {
        this.setState({ loading: true, loadingText: 'Attempting to Register' });

        fetch(REGISTER_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email: this.state.username,
              password: this.state.password,
              confirm_password: this.state.password_confirm,
              name: this.state.fullname,
            })
          }).then(resp => resp.json())
          .then(response => {
            if (response.error) {
              this.setState({
                loading: false,
                loadingText: ''
              });

              const errors = [];

              if (response.error.email) {
                errors.push(response.error.email[0]);
              }

              if (response.error.password) {
                errors.push(response.error.password[0]);
              }

              const mssg = errors.map(msg => msg).join(', ');

              Toast.show(errors[0], {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: '#ff000090'
              });
            } else if (response.success) {
              const token = response.success.token;
              this.setState({
                loadingText: 'Registration successful, logging you in...'
              });

              fetch(USER_API, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`
                },
              }).then(resp => resp.json()).then(data => {
                const info = data.success;
               
                const user = {
                  token,
                  user: info
                };
    
                const company = {
                  companyName: info.company.company_name,
                  companyAddress: info.company.company_address,
                  companyLogo: '',
                  userFullName: info.profile.full_name
                };
    
                this.props.updateCompanySettings(company);
                this.props.authUser(user);
              });
            } else {
                this.setState({ loading: false, loadingText: '' });
                Toast.show('Connection error', {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  backgroundColor: '#ff000090'
                });
              }
          }).catch(error => {
            console.log(`There was an error: ${error}`);
            this.setState({ loading: false, loadingText: '' });
            Toast.show('Connection error', {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              backgroundColor: '#ff000090'
            });
          });
    };


    render() {
        return (
            <Container>
                <Loader loading={this.state.loading} loadingText={this.state.loadingText} />
                <Header>
                    <Body>
                    <Title>I-voicer Register</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.content}>
                    <Form>
                        <Item floatingLabel error={this.state.username_has_error}>
                            <Label>Email</Label>
                            <Input 
                                value={this.state.username} 
                                onChangeText={(username) => this.setState(
                                    { username, username_has_error: false })} 
                            />
                            {
                                this.state.username_has_error ?
                                    <Icon name='close-circle' />
                                    :
                                    <Icon />
                            }
                        </Item>

                         <Item floatingLabel error={this.state.fullname_has_error}>
                            <Label>Full Name</Label>
                            <Input 
                                value={this.state.fullname} 
                                onChangeText={(fullname) => this.setState(
                                    { fullname, fullname_has_error: false })} 
                            />
                            {
                                this.state.fullname_has_error ?
                                    <Icon name='close-circle' />
                                    :
                                    <Icon />
                            }
                        </Item>

                        <Item floatingLabel error={this.state.password_has_error}>
                            <Label >Password</Label>
                            <Input 
                                value={this.state.password.split('').map(
                                    (character) => character && '*').join('')} 
                                onChangeText={(password) => this.setState(
                                    { password, password_has_error: false })}
                                secureTextEntry
                            />
                            {
                                this.state.password_has_error ?
                                    <Icon name='close-circle' />
                                    :
                                    <Icon />
                            }
                        </Item>

                        <Item floatingLabel error={this.state.password_has_error}>
                            <Label >Password Again</Label>
                            <Input 
                                value={this.state.password_confirm.split('').map(
                                (character) => character && '*').join('')}
                                onChangeText={(password) => this.setState(
                                    { 
                                        password_confirm: password, 
                                        password_confirm_has_error: false 
                                    })}
                                secureTextEntry
                            />
                            {
                                this.state.password_confirm_has_error ?
                                    <Icon name='close-circle' />
                                    :
                                    <Icon />
                            }
                        </Item>


                    </Form>

                    <Button block style={{ marginTop: 20, backgroundColor: 'red' }} onPress={this._handleClick}>
                        <Text>Register</Text>
                    </Button>
                </Content>
               
            </Container>
        );
    }
}

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: win.width * 0.9,
        margin: win.width * 0.05,
    },
    button: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#fff',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ authUser, updateCompanySettings }, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
