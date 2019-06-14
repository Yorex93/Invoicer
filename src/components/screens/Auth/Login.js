import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Center, Button, Text, Body, Title, Icon } from 'native-base';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { authUser, updateCompanySettings } from '../../../reducers/actions';
import Loader from '../../../components/loader';
import { LOGIN_API, USER_API } from '../../../constants';
import { timeoutPromise } from '../../../utils/functions';


class Login extends Component {

  constructor(props) {
    super(props);


    this.state = {
        username: '',
        username_has_error: false,
        password: '',
        password_has_error: false,
        password_hidden: '',
        hasError: false,
        errors: [],
        loading: false,
        loadingText: ''
    };
  }


    handleLoginClick = () => {
        let error = false;
        const errorMsg = [];
        if (this.state.username.length < 1) {
            errorMsg.push('Username field is empty');
            this.setState({ username_has_error: true });
            error = true;
        }

        if (this.state.password.length < 1) {
            errorMsg.push('Password field is empty');
            error = true;
            this.setState({ password_has_error: true });
        }
        if (error) {
            const mssg = errorMsg.map(msg => msg).join(', ');
            Toast.show(mssg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: '#00000090'
            });
          return false;
        }


       return this.login();
  };

  login = () => {
      this.setState({ loading: true, loadingText: 'Attempting to login' });

      // setTimeout(() => {
      //   if (this.state.loading) {
      //     this.setState({
      //       loading: false,
      //       loadingText: ''
      //     });
      //     Toast.show('Request took too long, check your internet settings', {
      //       duration: Toast.durations.LONG,
      //       position: Toast.positions.BOTTOM,
      //       shadow: true,
      //       animation: true,
      //       backgroundColor: '#00000090'
      //     });
      //   }
      // }, 10000);

      timeoutPromise(10000, 'Timed out', fetch(LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password,
        }),
      }))
      .then(resp => resp.json())
      .then(response => {
        if (response.error) {
          this.setState({
            loading: false,
            loadingText: ''
          });
          Toast.show('Login error: Email/Password Incorrect', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            backgroundColor: '#ff000090'
          });
        } else if (response.success) {
          const token = response.success.token;
          this.setState({
            loadingText: 'Login successful, Retrieving user information'
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
            <Title>I-voicer Login</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Form>
            <Item floatingLabel error={this.state.username_has_error}>
              <Label>Email</Label>
              <Input 
                value={this.state.username} 
                onChangeText={(username) => this.setState({ username, username_has_error: false })}
              />
                {
                  this.state.username_has_error ?
                      <Icon name='close-circle' />
                      :
                      <Icon />
                }
            </Item>
            <Item floatingLabel error={this.state.password_has_error}>
              <Label >Password</Label>
              <Input 
                value={this.state.password} 
                secureTextEntry 
                onChangeText={(password) => this.setState({ password, password_has_error: false })} 
              />
                {
                    this.state.password_has_error ?
                        <Icon name='close-circle' />
                        :
                        <Icon />
                }
            </Item>


          </Form>

          <Button block style={{ marginTop: 30 }} onPress={this.handleLoginClick}>
            <Text>Login</Text>
          </Button>
            <Button 
                block 
                style={{ marginTop: 20, backgroundColor: 'red' }} 
                onPress={() => { this.props.navigation.navigate('Register'); }}
            >
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

export default connect(null, mapDispatchToProps)(Login);
