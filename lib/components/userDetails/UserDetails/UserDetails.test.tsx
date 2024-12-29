import React from "react";
import { render } from "@testing-library/react-native";
import UserDetails from "./UserDetails";
import { ZellerCustomer } from "@/lib/apiService/customerService/types";

const mockUserDetails: ZellerCustomer = {
    id: "123",
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
};

describe("UserDetails", () => {
    it("renders correctly with the user details", () => {
        const { getByText } = render(<UserDetails userDetails={mockUserDetails} />);

        // Check that the correct text is rendered for each user detail
        expect(getByText(`ID: ${mockUserDetails.id}`)).toBeTruthy();
        expect(getByText(`Name: ${mockUserDetails.name}`)).toBeTruthy();
        expect(getByText(`Email: ${mockUserDetails.email}`)).toBeTruthy();
        expect(getByText(`Role: ${mockUserDetails.role}`)).toBeTruthy();
    });

    it("displays the correct ID", () => {
        const { getByText } = render(<UserDetails userDetails={mockUserDetails} />);
        expect(getByText(`ID: ${mockUserDetails.id}`)).toBeTruthy();
    });

    it("displays the correct Name", () => {
        const { getByText } = render(<UserDetails userDetails={mockUserDetails} />);
        expect(getByText(`Name: ${mockUserDetails.name}`)).toBeTruthy();
    });

    it("displays the correct Email", () => {
        const { getByText } = render(<UserDetails userDetails={mockUserDetails} />);
        expect(getByText(`Email: ${mockUserDetails.email}`)).toBeTruthy();
    });

    it("displays the correct Role", () => {
        const { getByText } = render(<UserDetails userDetails={mockUserDetails} />);
        expect(getByText(`Role: ${mockUserDetails.role}`)).toBeTruthy();
    });
});
