import { gql, useQuery } from "@apollo/client";
import { Metadata } from "../../interfaces/transaction/metadata.interface";

const GET_TRANSACTIONS = gql`
    query FetchTransactions($address: String!) {
        transactions(address: $address) {
            address
            txnHash
            summary
            from
            to
            location
        }
    }
`;

export interface Hash<T> {
  [key: string]: T;
};

const createTransactionsMap = (
    transactionsList: Metadata[],
    transactionsHash: Hash<Metadata>={}
): Hash<Metadata> => {
    transactionsList?.reduce<Record<string, Metadata>>(
        (acc, transaction: Metadata) => {
            acc[transaction.txnHash] = transaction;
            
            return acc;
        }, transactionsHash);

    return transactionsHash;
};

export const useFetchTransactions = (address: string | null | undefined): Hash<Metadata> => {
    const { data } = useQuery(GET_TRANSACTIONS, {
        variables: { address }
    });

    return createTransactionsMap(data?.transactions);
};
