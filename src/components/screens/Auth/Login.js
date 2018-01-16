import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Center, Button, Text, Toast, Body, Title, Icon } from 'native-base';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authUser } from '../../../reducers/actions';


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
            Toast.show({
                text: mssg,
                position: 'bottom',
                buttonText: 'Okay',
                type: 'danger',
                duration: 3000,
            });
          return false;
        }


       return this.login();
  };

  login = () => {
      const user = {
          username: this.state.username,
          password: this.state.password,
          firstName: 'Emmanuel'
      };
      this.props.authUser(user);
  };


  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>I-voicer Login</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Form>
            <Item floatingLabel error={this.state.username_has_error}>
              <Label>Username</Label>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ authUser }, dispatch);

export default connect(null, mapDispatchToProps)(Login);
