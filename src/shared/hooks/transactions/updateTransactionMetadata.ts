import { gql } from "@apollo/client";

export const UPDATE_TRANSACTION_METADATA = gql`
    mutation UpdateTransactionMetadata(
        $address: String!, 
        $txnHash: String!, 
        $summary: String,
        $from: String,
        $to: String,
        $location: String,
    ) {
        updateTransaction(input: {
            address: $address,
            txnHash: $txnHash,
            params: { 
                address: $address, 
                txnHash: $txnHash,
                summary: $summary,
                from: $from,
                to: $to,
                location: $location
            }
        }) {
            transaction {
                address
                txnHash
                summary
                from
                to
                location
            }
        }
    }
`;
