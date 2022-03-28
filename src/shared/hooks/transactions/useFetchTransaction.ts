import { gql, useQuery } from "@apollo/client";
import { TransactionMetadata } from "../../interfaces/transactionMetadata.interface";

const FETCH_TRANSACTION = gql`
    query FetchTransaction($address: String!, $txnHash: String!) {
    transaction(address: $address, txnHash: $txnHash) {
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

export const useFetchTransaction = (address: string, txnHash: string): TransactionMetadata => {
    const { data } = useQuery(FETCH_TRANSACTION, {
        variables: { address, txnHash }
    });

    return data?.transaction
};
