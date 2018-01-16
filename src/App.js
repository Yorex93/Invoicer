import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Container, Root } from 'native-base';
import Login from './components/screens/Auth/Login';
import SignUp from './components/screens/Auth/SignUp';
import { MainRouter } from './components/screens/index';
import styles from './components/container/styles';


const AuthNavigator = StackNavigator({
        Login: {
            screen: Login,
        },
        Register: {
            screen: SignUp,
        }
    },
    {
        navigationOptions: {
            header: null,
        }
    }
);

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          CurrentUser: []
      };
  }

  componentDidMount() {
      if (this.props.CurrentUser !== this.state.CurrentUser) {
          this.setState({ CurrentUser: this.props.CurrentUser });
      }
      console.log(this.props.Store);
  }

  componentWillUpdate({ CurrentUser }) {
      if (CurrentUser !== this.state.CurrentUser) {
          this.setState({ CurrentUser });
      }
  }


  render() {
    return (

            <Root>
                <Container style={styles.container}>
                    {
                        this.state.CurrentUser.length > 0 ?
                            <MainRouter currentUser={this.state.CurrentUser} />
                            :
                            <AuthNavigator />
                    }
                </Container>
            </Root>

     );
  }


}

const mapStateToProps = (state) => ({
       CurrentUser: state.CurrentUser,
       Store: state

   });


export default connect(mapStateToProps)(App);
