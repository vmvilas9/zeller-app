import React from 'react';
import {render} from '@testing-library/react-native';
import {MyActivityIndicator} from './index';

describe('MyActivityIndicator', () => {
    it('renders correctly with default props', () => {
        const {toJSON} = render(<MyActivityIndicator/>);
        expect(toJSON()).toMatchSnapshot();
    });

    it('applies additional props passed to ActivityIndicator', () => {
        const {getByTestId} = render(
            <MyActivityIndicator testID="activity-indicator" color="#0000FF"/>
        );
        const indicator = getByTestId('activity-indicator');
        expect(indicator.props.color).toBe('#0000FF');
    });

    it('sets the size to large by default', () => {
        const {getByTestId} = render(<MyActivityIndicator testID="activity-indicator"/>);
        const indicator = getByTestId('activity-indicator');
        expect(indicator.props.size).toBe('large');
    });

    it('overrides the size when provided via props', () => {
        const {getByTestId} = render(
            <MyActivityIndicator testID="activity-indicator" size="small"/>
        );
        const indicator = getByTestId('activity-indicator');
        expect(indicator.props.size).toBe('small');
    });
});
