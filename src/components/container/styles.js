import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
        header: {
           backgroundColor: '$primaryColor',
            color: 'white'
        },
        container: {
            flex: 1,
        },
        welcome: {
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

const secondaryColor = '#29abbf';
const faintTextColor = '#b7c5ba';

export const myStyles = {
    cardStyles: {
        card: {
            marginBottom: 20,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
        },
        cardHeader: {
            backgroundColor: 'green',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        },
        cardHeaderText: { color: 'white' }

    },
    generalContent: {
        content: { padding: 10, flex: 1 }
    },
    dashboardStyles: {
        detailsText: {
            paddingTop: 6,
            paddingBottom: 6,
            color: 'grey',
        }
    },

    faintTextColor
};
