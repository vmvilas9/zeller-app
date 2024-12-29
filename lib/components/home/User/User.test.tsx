import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import User from './User'; // Adjust the import path as necessary
import {ZellerCustomer} from '@/lib/apiService/customerService/types';

// Mock data
const user: ZellerCustomer = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
};

describe('User Component', () => {
    it('renders user information correctly', () => {
        const {getByText, getByTestId} = render(
            <User userDetails={user} onUserClick={() => {
            }}/>
        );

        // Check name and role are rendered
        expect(getByText(user.name)).toBeTruthy();
        expect(getByText(user.role)).toBeTruthy();

        // Check avatar contains the first letter of the name
        expect(getByTestId('avatar-text').children[0]).toBe(user.name.charAt(0).toUpperCase());
    });

    it('calls onUserClick when clicked', () => {
        const mockOnUserClick = jest.fn();
        const {getByTestId} = render(
            <User userDetails={user} onUserClick={mockOnUserClick}/>
        );

        // Trigger click event
        fireEvent.press(getByTestId('user-item'));

        // Check that onUserClick was called with the correct user ID
        expect(mockOnUserClick).toHaveBeenCalledWith(user.id);
    });

    it('applies correct styles', () => {
        const {getByTestId} = render(
            <User userDetails={user} onUserClick={() => {
            }}/>
        );

        // Check that the user item style is applied correctly
        const userItem = getByTestId('user-item');
        expect(userItem.props.style).toEqual(expect.objectContaining({opacity: 1}));
    });
});
