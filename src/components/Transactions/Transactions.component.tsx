import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "ethers/lib/utils";
import { Column } from "react-table";

import Table from "../Table.component";
import useAxios from "../../shared/hooks/useAxios";
import { useGetTransactions } from "../../shared/hooks/transactions/useGetTransactions";
import { TransactionRaw } from "../../shared/interfaces/transactionRaw.interface";
import { TransactionAggregate } from "../../shared/interfaces/transactionAggregate.interface";

interface Props {
  account: any;
}

function Transactions({ account }: Props) {
    account = "0x8c469877b27932abdd2313c4b6bf7cff5667fdb9";

    const transactions = useGetTransactions(account);

    const { response, loading, error } = useAxios({
        method: "get",
        url: `/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=4YT69IDTQ4BWK3QRH24AGQ4YHSC28Q1AYV`,
        headers: {
            accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const columns: Column<TransactionAggregate>[] = React.useMemo(
        () => [
            {
                Header: 'Transaction',
                columns: [
                    {
                        Header: "Txn Hash",
                        accessor: "txnHash",
                    },
                    {
                        Header: "Date Time (UTC)",
                        accessor: "date",
                    },
                    {
                        Header: "Value",
                        accessor: "value",
                    },
                ]
            },
            {
                Header: 'Metadata',
                columns: [
                    {
                        Header: "From",
                        accessor: "from",
                    },
                    {
                        Header: "To",
                        accessor: "to",
                    },
                    {
                        Header: "Summary",
                        accessor: "summary",
                    },
                    {
                        Header: "Location",
                        accessor: "location",
                    },
                    {
                        Header: "Status",
                        accessor: "status",
                    },
                ]
            } 
        ],
        []
    );

    const shortenAddress = (str: String): String => (
        str.slice(0, 6) + '...' + str.slice(-4)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = () => (
        response?.data.result.map((etherscanTransaction: TransactionRaw) => {
            const { hash: txnHash, timeStamp, value } = etherscanTransaction;
            const { from, to, summary, location } = transactions[txnHash] || {}

            return {
                txnHash: shortenAddress(txnHash),
                date: new Date(parseInt(timeStamp) * 1000).toUTCString(),
                value: formatEther(BigNumber.from(value)).slice(0, 8) + " ETH",
                from,
                to,
                summary,
                location,
            };
        })
    );

    const data = React.useMemo(() => getData(), [getData]);

    return (
        <div className="mx-auto">
            {loading && (
                <p>Loading...</p>
            )}
            {error && (
                <p>{error.message}</p>
            )}
            {!loading && !error && (
                <div>
                    <Table columns={columns} data={data} />
                </div>
            )}
        </div>
    );
}

export default Transactions;
