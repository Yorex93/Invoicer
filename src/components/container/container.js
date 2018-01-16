import React, {PropTypes} from 'react';
import View from 'react-native';

export const Container = ({ children }) => (
    <View>
        {children}
    </View>
);


Container.propTypes({
    children: PropTypes.element,
});

