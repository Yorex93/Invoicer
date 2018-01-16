import React from 'react';
import { bindActionCreators } from 'redux';
import { Image } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Body, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { logOutUser } from '../../../reducers/actions';


const mainRoutes = [
    { screen: 'Home', icon: 'home', name: 'Dashboard' },
    { screen: 'Drafts', icon: 'folder-open', name: 'Drafts' },
    { screen: 'History', icon: 'paper', name: 'History' }
    ];

const styles = {
    list: {
        paddingLeft: 15,
        marginLeft: 0,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        paddingTop: 15,
        paddingBottom: 15,
    },
    icon: {
        color: '#aaaaaa',
        fontSize: 16,
    },
    linkBody: {
        borderColor: 'transparent'
    },
    linkText: {
        color: '#8c8c8c',
        fontSize: 16,
    }
};

class SideBar extends React.Component {

    renderList = () => mainRoutes.map(link => (
            <ListItem
                icon
                button
                onPress={() => this.props.navigation.navigate(link.screen)}
                style={{
                    paddingLeft: 15,
                    marginLeft: 0,
                    backgroundColor: 'transparent',
                    borderBottomColor: 'transparent',
                    paddingTop: 15,
                    paddingBottom: 15,
                }}
                key={link.screen}
            >
                <Left>
                    <Icon name={link.icon} style={styles.icon} />
                </Left>
                <Body style={styles.linkBody}>
                    <Text style={styles.linkText}>{link.name}</Text>
                </Body>
            </ListItem>
            ));

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#fff' }}>
                    <Image
                        source={require('../../../assets/banner.jpg')}
                        style={{
                            height: 160,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} 
                    />
                    <List style={{ }}>
                        {this.renderList()}

                        <ListItem
                            icon
                            button
                            onPress={() => this.props.logOutUser()}
                            style={styles.list}
                        >
                            <Left>
                                <Icon name='unlock' style={styles.icon} />
                            </Left>
                            <Body style={styles.linkBody}>
                                <Text style={styles.linkText}>Logout</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
       CurrentUser: state.CurrentUser
   });

const mapDispatchToProps = (dispatch) => bindActionCreators({ logOutUser }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
