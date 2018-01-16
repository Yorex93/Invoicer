import React from 'react';
import {Header, Left, Body, Right, Title, Subtitle, Icon, Button} from 'native-base';

export default class AppHeader extends React.Component {

    toggleDrawer = () => {
        this.props.onMenuPressed();
    };


    render() {
        return (
            <Header 
                androidStatusBarColor={'#006600'}
                style={{ backgroundColor: '#006600' }}
            >
                <Left>
                    <Button transparent onPress={() => { this.props.onLeftIconPressed(); }}>
                        <Icon name={this.props.leftIcon} />
                    </Button>
                </Left>
                {
                    this.props.subtitle ?
                    <Body>
                        <Title>{this.props.title}</Title>
                        <Subtitle style={{ color: '#DBDBDB' }}>{this.props.subtitle}</Subtitle>
                    </Body>
                    :
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>

                }
                <Right>

                    <Button transparent onPress={() => { this.props.onRightIconPressed(); }}>
                        <Icon name={this.props.rightIcon} />
                    </Button>
                </Right>
            </Header>
        );
    }


}


export class SettingsHeader extends React.Component {

    toggleDrawer = () => {
        this.props.onMenuPressed();
    };


    render() {
        return (
            <Header
              androidStatusBarColor={'#006600'}
                style={{ backgroundColor: '#006600' }}
            >
                <Left>
                    <Button transparent onPress={() => { this.props.onBackPressed(); }}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
