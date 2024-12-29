import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {MyRadioButton} from './index';

describe('MyRadioButton', () => {
    it('renders correctly when unselected', () => {
        const tree = renderer
            .create(<MyRadioButton text="Test Radio" selected={false} onSelect={() => {
            }}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when selected', () => {
        const tree = renderer
            .create(<MyRadioButton text="Test Radio" selected={true} onSelect={() => {
            }}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('displays the correct text', () => {
        const {getByText} = render(
            <MyRadioButton text="Test Radio Button" selected={false} onSelect={() => {
            }}/>
        );

        expect(getByText('Test Radio Button')).toBeTruthy();
    });

    it('applies the correct style when unselected', () => {
        const {getByTestId, queryByTestId} = render(
            <MyRadioButton text="Test Radio" selected={false} onSelect={() => {
            }}/>
        );

        const outerCircle = getByTestId('radio-outer-circle');
        expect(outerCircle.props.style).toEqual(
            expect.objectContaining([
                {
                    "backgroundColor": "#FFFFFF"
                },
                {
                    "alignItems": "center",
                    "borderColor": "#0171CE",
                    "borderRadius": 12,
                    "borderWidth": 2,
                    "height": 24,
                    "justifyContent": "center",
                    "marginRight": 12,
                    "width": 24
                }
            ]),
        );

        expect(queryByTestId('radio-inner-circle')).toBeNull()
    });

    it('applies the correct style when selected', () => {
        const {getByTestId} = render(
            <MyRadioButton text="Test Radio" selected={true} onSelect={() => {
            }}/>
        );

        const innerCircle = getByTestId('radio-inner-circle');
        expect(innerCircle).toBeTruthy();
    });

    it('calls onSelect when pressed', () => {
        const mockOnSelect = jest.fn();

        const {getByText} = render(
            <MyRadioButton text="Test Radio" selected={false} onSelect={mockOnSelect}/>
        );

        fireEvent.press(getByText('Test Radio'));
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
});
