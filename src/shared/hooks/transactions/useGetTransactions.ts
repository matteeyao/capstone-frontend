import { gql, useQuery } from "@apollo/client";
import { TransactionMetadata } from "../../interfaces/transactionMetadata.interface";

const GET_TRANSACTIONS = gql`
    query FetchTransactions($address: String!) {
        transactions(address: $address) {
            id
            address
            txnHash
            summary
            from
            to
            location
        }
    }
`;

interface Hash<T> {
  [key: string]: T;
};

const createTransactionsMap = (
    transactionsList: TransactionMetadata[],
    transactionsHash: Hash<TransactionMetadata>={}
): Hash<TransactionMetadata> => {
    transactionsList?.reduce<Record<string, TransactionMetadata>>(
        (acc, transaction: TransactionMetadata) => {
            acc[transaction.txnHash] = transaction;
            
            return acc;
        }, transactionsHash);

    return transactionsHash;
};

export const useGetTransactions = (address: string): Hash<TransactionMetadata> => {
    const { data } = useQuery(GET_TRANSACTIONS, {
        variables: { address }
    });

    return createTransactionsMap(data?.transactions);
};
