import React, { useMemo, useState } from "react";
import { Column } from "react-table";

import Table from "../Table.component";
import { Transaction } from "../../shared/interfaces/transaction/transaction.interface";
import { Metadata } from "../../shared/interfaces/transaction/metadata.interface";

interface Props {
  txnData: Transaction[]
  metaData: Metadata[]
}

function Transactions({ txnData, metaData }: Props) {
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

    const [metadata, setMetadata] = useState(metaData);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
                <Table columns={txnColumns} data={txnData} />
                <Table columns={metaColumns} data={metadata} />
            </div>
        </div>
    );
}

export default Transactions;
