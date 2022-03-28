import { BigNumber } from "@ethersproject/bignumber";
import { AxiosResponse } from "axios";
import { formatEther } from "ethers/lib/utils";
import dateFormat from "dateformat";

import { Hash } from "../../shared/hooks/transactions/useGetTransactions";
import { Metadata } from "../../shared/interfaces/transaction/metadata.interface";
import { Transaction } from "../../shared/interfaces/transaction/transaction.interface";

const shortenAddress = (str: String): String => (
    str.slice(0, 6) + '...' + str.slice(-4)
);

const readableDate = (timeStamp: string): string => {
    const datetime = new Date(parseInt(timeStamp) * 1000);
    return dateFormat(datetime, "ddd, mmm d, yyyy, hh:MM TT")
}

export const getTxnData = (
    response: AxiosResponse<any, any> | undefined
) => (
    response?.data.result.map((etherscanTransaction: Transaction) => {
        const { hash: txnHash, timeStamp, value } = etherscanTransaction;

        return {
            txnHash: <a 
            href={`https://rinkeby.etherscan.io/tx/${txnHash}`}
            target="_blank" rel="noreferrer">
                {shortenAddress(txnHash)}
            </a>,
            date: readableDate(timeStamp),
            value: formatEther(BigNumber.from(value)).slice(0, 8) + " ETH",
        };
    })
);

export const getMetadata = (
    response: AxiosResponse<any, any> | undefined,
    transactions: Hash<Metadata>
) => (
    response?.data.result.map((etherscanTransaction: Transaction) => {
        const { hash: txnHash } = etherscanTransaction;
        const { from, to, summary, location } = transactions[txnHash] || {};

        return {
            from,
            to,
            summary,
            location,
        };
    })
);
