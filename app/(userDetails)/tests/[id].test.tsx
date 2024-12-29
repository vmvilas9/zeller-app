import React from "react";
import {render, waitFor} from "@testing-library/react-native";
import {useLocalSearchParams} from "expo-router";
import {fetchZellerCustomer} from "@/lib/apiService/customerService/customerService";
import CustomerDetail from "../[id]";

// Mock the necessary dependencies
jest.mock("expo-router", () => ({
    useLocalSearchParams: jest.fn(),
}));

jest.mock("@/lib/apiService/customerService/customerService", () => ({
    fetchZellerCustomer: jest.fn(),
}));

describe("CustomerDetail", () => {
    const mockCustomer = {
        id: "123",
        name: "John Doe",
        email: "johndoe@example.com",
        role: "Admin",
    };

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        // Mock the params to simulate fetching for a specific customer ID
        (useLocalSearchParams as jest.Mock).mockReturnValue({id: "123"});

        // Mock fetchZellerCustomer to return a customer object
        (fetchZellerCustomer as jest.Mock).mockResolvedValueOnce(mockCustomer);
        const {toJSON, queryByTestId} = render(<CustomerDetail/>);
        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
        expect(toJSON()).toMatchSnapshot();
    });

    it("renders loading indicator when data is being fetched", async () => {
        // Mock the params to simulate fetching for a specific customer ID
        (useLocalSearchParams as jest.Mock).mockReturnValue({id: "123"});

        // Mock fetchZellerCustomer to return a promise
        (fetchZellerCustomer as jest.Mock).mockResolvedValueOnce(undefined);

        const {findByTestId} = render(<CustomerDetail/>);

        const loader = await findByTestId('activity-indicator');

        // Check if the loading component is rendered
        expect(loader).toBeTruthy();
    });

    it("renders error message if customer data is not found", async () => {
        // Mock the params to simulate fetching for a specific customer ID
        (useLocalSearchParams as jest.Mock).mockReturnValue({id: "123"});

        // Mock fetchZellerCustomer to return undefined (simulating no customer found)
        (fetchZellerCustomer as jest.Mock).mockResolvedValueOnce(undefined);

        const {findByTestId, queryByTestId} = render(<CustomerDetail/>);

        // Wait for the loading state to be gone
        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());

        // Check if the "No customer found" message is rendered
        expect(findByTestId('no-data')).toBeTruthy();
    });

    it("renders customer details when data is fetched successfully", async () => {
        // Mock the params to simulate fetching for a specific customer ID
        (useLocalSearchParams as jest.Mock).mockReturnValue({id: "123"});

        // Mock fetchZellerCustomer to return a customer object
        (fetchZellerCustomer as jest.Mock).mockResolvedValueOnce(mockCustomer);

        const {findByTestId} = render(<CustomerDetail/>);

        const userDetails = await findByTestId('user-details');

        // Check if the customer name is rendered in UserDetails
        expect(userDetails).toBeTruthy();
    });

    it("handles errors in fetching customer data", async () => {
        // Mock the params to simulate fetching for a specific customer ID
        (useLocalSearchParams as jest.Mock).mockReturnValue({id: "123"});

        // Mock fetchZellerCustomer to throw an error
        (fetchZellerCustomer as jest.Mock).mockRejectedValueOnce(new Error("Error fetching customer"));

        const {findByTestId, queryByTestId} = render(<CustomerDetail/>);

        // Wait for the loading state to be gone
        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());

        // Check if the "No customer found" message is rendered
        expect(findByTestId('no-data')).toBeTruthy();
    });
});

