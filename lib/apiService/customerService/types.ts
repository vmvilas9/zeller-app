export type ZellerCustomer =  {
    id: string;
    name: string;
    email: string;
    role: string;
}

export type ZellerCustomerConnection = {
    items: ZellerCustomer[];
    nextToken: string;
}

export type TableStringFilterInput = {
    ne?: string;
    eq?: string;
    le?: string;
    lt?: string;
    ge?: string;
    gt?: string;
    contains?: string;
    notContains?: string;
    between?: [string, string];
    beginsWith?: string;
};

export type TableZellerCustomerFilterInput = {
    id?: TableStringFilterInput;
    name?: TableStringFilterInput;
    email?: TableStringFilterInput;
    role?: TableStringFilterInput;
};
