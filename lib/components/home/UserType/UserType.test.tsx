import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {UserTypeView} from './index';
import {UserType} from './types';

// Mock data
const userType: UserType = {
    displayName: 'Admin',
    type: 'ADMIN',
};

const mockSetSelectedUserType = jest.fn();

describe('UserTypeView Component', () => {
    it('renders userType displayName correctly', () => {
        const {getByText} = render(
            <UserTypeView
                userType={userType}
                selectedUserType=""
                setSelectedUserType={mockSetSelectedUserType}
            />
        );

        // Check that the displayName is rendered
        expect(getByText(userType.displayName)).toBeTruthy();
    });

    it('selects the radio button when selectedUserType matches userType type', () => {
        const {getByTestId} = render(
            <UserTypeView
                userType={userType}
                selectedUserType="ADMIN"
                setSelectedUserType={mockSetSelectedUserType}
            />
        );

        // Find the outer circle by the test ID
        const outerCircle = getByTestId('radio-outer-circle');

        // Check if the outer circle has the expected selected background color
        expect(outerCircle.props.style[1]).toEqual(
            expect.objectContaining({borderColor: '#0171CE'}) // Style for selected state
        );

        const innerCircle = getByTestId('radio-inner-circle');
        expect(innerCircle).toBeTruthy()
    });


    it('does not select the radio button when selectedUserType does not match userType type', () => {
        const {queryByTestId, getByTestId} = render(
            <UserTypeView
                userType={userType}
                selectedUserType="USER"
                setSelectedUserType={mockSetSelectedUserType}
            />
        );

        // Find the outer circle by the test ID
        const outerCircle = getByTestId('radio-outer-circle');

        // Check if the outer circle has the expected selected background color
        expect(outerCircle.props.style[1]).toEqual(
            expect.objectContaining({borderColor: '#0171CE'}) // Style for selected state
        );

        expect(queryByTestId('radio-inner-circle')).toBeNull()
    });

    it('calls setSelectedUserType when the radio button is clicked', () => {
        const {getByText} = render(
            <UserTypeView
                userType={userType}
                selectedUserType="USER"
                setSelectedUserType={mockSetSelectedUserType}
            />
        );

        // Simulate click
        fireEvent.press(getByText(userType.displayName));

        // Verify that setSelectedUserType was called with the correct type
        expect(mockSetSelectedUserType).toHaveBeenCalledWith(userType.type);
    });
});
