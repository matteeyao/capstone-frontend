import React from "react";
import { Column } from "react-table";

import Table from "../Table.component";
import useAxios from "../../shared/hooks/useAxios";
import { useGetTransactions } from "../../shared/hooks/transactions/useGetTransactions";
import { Transaction } from "../../shared/interfaces/transaction/transaction.interface";
import { Metadata } from "../../shared/interfaces/transaction/metadata.interface";
import { getTxnData, getMetaData } from "./Transactions.services";

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

    const txnColumns: Column<Transaction>[] = React.useMemo(
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
            }
        ],
        []
    );

    const metaColumns: Column<Metadata>[] = React.useMemo(
        () => [
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

    const txnData = React.useMemo(() => getTxnData(response), [response]);
    const metaData = React.useMemo(() => getMetaData(response, transactions), [response, transactions]);

    return (
        <div className="mx-auto">
            {loading && (
                <p>Loading...</p>
            )}
            {error && (
                <p>{error.message}</p>
            )}
            {!loading && !error && (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4">
                        <Table columns={txnColumns} data={txnData} />
                        <Table columns={metaColumns} data={metaData} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;
