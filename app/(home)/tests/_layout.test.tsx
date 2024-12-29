import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Home from '../_layout';  // Adjust the path as necessary
import {listZellerCustomers} from '@/lib/apiService/customerService/customerService';  // Adjust the path as necessary
import {userTypes} from "@/app/(home)/constants";
import {TableZellerCustomerFilterInput} from "@/lib/apiService/customerService/types";
import React from "react";
import {useRouter} from "expo-router";  // Adjust the path as necessary

// Mock API call
jest.mock('@/lib/apiService/customerService/customerService', () => ({
    listZellerCustomers: jest.fn(),
}));

// Mock useRouter hook for navigation
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('Home Component', () => {
    const filter: TableZellerCustomerFilterInput = {
        role: {eq: 'ADMIN'},
    };
    const mockCustomers = [{id: '1', name: 'John Doe', role: 'ADMIN', email: 'john@example.com'}];

    it('renders the Home component correctly', async () => {
        (listZellerCustomers as jest.Mock).mockReturnValue(filter);
        (listZellerCustomers as jest.Mock).mockResolvedValueOnce({items: mockCustomers});
        const {toJSON, queryByTestId} = render(<Home/>);
        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders loading indicator when data is being fetched', async () => {
        (listZellerCustomers as jest.Mock).mockReturnValue(filter);
        (listZellerCustomers as jest.Mock).mockResolvedValueOnce({items: mockCustomers});
        const {findByTestId} = render(<Home/>);

        // Simulate loading state
        expect(await findByTestId('activity-indicator')).toBeTruthy();
    });

    it('renders customer list after data is fetched', async () => {
        (listZellerCustomers as jest.Mock).mockReturnValue(filter);
        (listZellerCustomers as jest.Mock).mockResolvedValueOnce({items: mockCustomers});

        const {findByTestId, findByText} = render(<Home/>);

        // Wait for the list to be rendered
        await waitFor(() => expect(findByTestId('user-types')).toBeTruthy());

        // Check if the customer name is rendered
        expect(findByText('John Doe')).toBeTruthy();
    });

    it('fetches customers based on selected user type', async () => {
        (listZellerCustomers as jest.Mock).mockReturnValue(filter);
        (listZellerCustomers as jest.Mock).mockResolvedValueOnce({items: mockCustomers});

        const {getByText, queryByTestId, findByText} = render(<Home/>);

        // Select a different user type
        fireEvent.press(getByText('Admin'));

        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());

        await waitFor(() => expect(queryByTestId('user-types')).toBeTruthy());

        // Wait for the customer data to be rendered after filtering
        await waitFor(() => expect(findByText('John Doe')).toBeTruthy());
    });

    it('navigates to user details page when a user is clicked', async () => {
        const mockPush = jest.fn();
        (listZellerCustomers as jest.Mock).mockReturnValue(filter);
        (useRouter as jest.Mock).mockReturnValue({push: mockPush});


        (listZellerCustomers as jest.Mock).mockResolvedValueOnce({items: mockCustomers});

        const {getByTestId, queryByTestId} = render(<Home/>);

        await waitFor(() => expect(queryByTestId('user-types')).toBeTruthy());

        // Trigger the click event
        fireEvent.press(getByTestId('user-item'));

        // Check if the navigation function is called with the correct user ID
        expect(mockPush).toHaveBeenCalledWith('/(userDetails)/1');
    });

    it('renders user types and updates customer list when a type is selected', () => {
        const {findByText, getByText} = render(<Home/>);

        // Check if user types are rendered
        userTypes.forEach((type) => {
            expect(findByText(type.displayName)).toBeTruthy();
        });

        // Simulate selecting a different user type
        fireEvent.press(getByText(userTypes[1].displayName));  // Selecting second user type

        // Check if the customer list is filtered accordingly
        expect(findByText(`${userTypes[1].type} Users`)).toBeTruthy();
    });

});
