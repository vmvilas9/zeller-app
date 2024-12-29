import {ApolloQueryResult} from "@apollo/client";
import client from "../../network/client";
import {GET_ZELLER_CUSTOMER, LIST_ZELLER_CUSTOMERS} from "./queries";
import {TableZellerCustomerFilterInput, ZellerCustomer, ZellerCustomerConnection} from "./types";

export async function fetchZellerCustomer(id: string): Promise<ZellerCustomer | undefined> {
    try {
        const result: ApolloQueryResult<{ getZellerCustomer: ZellerCustomer }> = await client.query({
            query: GET_ZELLER_CUSTOMER,
            variables: {id},
        });
        return result.data?.getZellerCustomer;
    } catch (error) {
        console.error("Error fetching customer:", error);
        return undefined;
    }
}

export async function listZellerCustomers (
    filter?: TableZellerCustomerFilterInput,
    limit: number = 50,
    nextToken?: string
): Promise<ZellerCustomerConnection> {
    try {
        const result: ApolloQueryResult<{
            listZellerCustomers: ZellerCustomerConnection;
        }> = await client.query({
            query: LIST_ZELLER_CUSTOMERS,
            variables: {filter, limit, nextToken},
        });

        return result.data?.listZellerCustomers || {items: [], nextToken: null};
    } catch (error) {
        console.error("Error listing customers:", error);
        throw error;
    }
}
