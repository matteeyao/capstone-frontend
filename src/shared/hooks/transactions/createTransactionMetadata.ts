import { gql } from "@apollo/client";

export const CREATE_TRANSACTION_METADATA = gql`
    mutation AddTransactionMetadata(
        $address: String!, 
        $txnHash: String!, 
        $summary: String,
        $from: String,
        $to: String,
        $location: String,
    ) {
        addTransaction(input: { params: { 
            address: $address, 
            txnHash: $txnHash,
            summary: $summary,
            from: $from,
            to: $to,
            location: $location
        }}) {
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
