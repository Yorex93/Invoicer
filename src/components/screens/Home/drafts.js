import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    ListView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Left, Body, Right, Button, Title, Fab, Content, Icon, View, Card, Text, ListItem, List, CardItem } from 'native-base';
import AppHeader from '../../container/Header';
import { myStyles } from '../../container/styles';
import { deleteDraft, emptyDraft } from '../../../reducers/actions';


class DraftsScreen extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          basic: true,
          listViewData: [],
        };
      }

      componentDidMount() {
        //console.log(this.props.InvoiceList);
        this.setState({ listViewData: this.props.Drafts });
      }

      componentWillUpdate({ Drafts }) {
          if (Drafts.length !== this.state.listViewData.length) {
            this.setState({ listViewData: Drafts });
          }     
      }

      deleteRow = (secId, rowId, rowMap, invoice) => {
        Alert.alert(
            'Confirm delete',
            'Are you sure?',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => { this.props.deleteDraft(invoice.DraftId); } },
            ],
            { cancelable: true }
          );
      };


    render() {
        return (
            <Container>
                <AppHeader
                    title='Drafts'
                    onLeftIconPressed={() => { this.props.navigation.navigate('DrawerToggle'); }}
                    onRightIconPressed={() => { this.props.navigation.navigate('SettingsScreen'); }}
                    leftIcon="menu"
                    rightIcon="settings"
                />
                <Content>
                    {this.state.listViewData.length > 0 ? 
                        <List
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            
                            renderRow={invoice =>
                            <ListItem style={styles.list}>
                                <Body>
                                    <Text>Invoice #: {invoice.invoiceNumber} </Text>
                                    <Text note>Billed to {invoice.clientName} ({invoice.billTo})</Text>
                                    <Text note>Total { invoice.invoiceItems.length > 0 ? invoice.invoiceItems.map(item => parseInt(item.itemUnitCost * item.itemQuantity, 10)).reduce((prev, next) => prev + next).toFixed(2) : '' }</Text>
                                </Body>
                            </ListItem>}
                            renderLeftHiddenRow={invoice =>
                            <Button full onPress={() => { this.navigation.navigate('InvoiceSummary', { invoice }); }}>
                                <Icon active name="information-circle" />
                            </Button>}
                            renderRightHiddenRow={(invoice, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, invoice)}>
                                <Icon active name="trash" />
                            </Button>}
                            leftOpenValue={80}
                            rightOpenValue={-80}
                        />
                    :
                    <Card style={{ marginLeft: 10, marginRight: 10 }}>
                        <CardItem>
                            <Body>
                                <Text style={{ alignSelf: 'center' }}>No Drafts</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    }
                </Content>
            </Container>
        );
    }
}

const styles = {
    list: {
        paddingLeft: 17,
        marginLeft: 0,
        backgroundColor: 'transparent'
    }
};

const mapStateToProps = (state) => ({
        Drafts: state.Drafts
    });

const mapDispatchToProps = (dispatch) => bindActionCreators({ deleteDraft, emptyDraft }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DraftsScreen);
