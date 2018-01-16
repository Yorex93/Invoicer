import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Center, Button, Text, Toast, Body, Title , Icon} from 'native-base';
import { StyleSheet, Dimensions, Alert} from 'react-native';




export default class SignUp extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            username_has_error: false,
            password: '',
            password_has_error: false,
            password_hidden: '',
            hasError: false,
            errors :[],
        };


    }


    _handleClick = () => {
        //  this.setState({ username: 'gg'})
        // Alert.alert('hi');
        let error = false;
        let error_msg = [];
        if(this.state.username.length < 1){
            error_msg.push('Username field is empty');
            this.setState({ username_has_error: true });
            error = true;
        }

        if(this.state.password.length < 1){
            error_msg.push('Password field is empty');
            error = true;
            this.setState({ password_has_error: true });

        }
        if(error){
            let mssg = error_msg.map(msg => {
                return msg;
            }).join(', ');
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

    login = () =>{
        Alert.alert('Login Successful');
        this.props.onLogin(true);
    };


    render(){
        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                    <Title>I-voicer Login</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content style={styles.content}>
                    <Form>
                        <Item floatingLabel error={this.state.username_has_error}>
                            <Label>Username</Label>
                            <Input  value={this.state.username} onChangeText={(username) => this.setState({username, username_has_error: false})} />
                            {
                                this.state.username_has_error ?
                                    <Icon name='close-circle' />
                                    :
                                    <Icon/>
                            }
                        </Item>
                        <Item floatingLabel error={this.state.password_has_error}>
                            <Label >Password</Label>
                            <Input value={this.state.password.split('').map((character) => character && '*').join('')} onChangeText={(password) => this.setState({password, password_has_error: false })}/>
                            {
                                this.state.password_has_error ?
                                    <Icon name='close-circle'/>
                                    :
                                    <Icon/>
                            }
                        </Item>


                    </Form>

                    <Button block style={{marginTop: 30}} onPress={this._handleClick}>
                        <Text>Login</Text>
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
