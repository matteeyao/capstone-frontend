import React, { useMemo, useState } from "react";
import { Column } from "react-table";

import Table from "../Table.component";
import { Transaction } from "../../shared/interfaces/transaction/transaction.interface";
import { Metadata } from "../../shared/interfaces/transaction/metadata.interface";
import EditableTable from "../EditableTable/EditableTable.component";

interface Props {
    account: string;
    txnData: Transaction[];
    metaData: Metadata[];
}

function Transactions({ account, txnData, metaData }: Props) {
    const txnColumns: Column<Transaction>[] = useMemo(
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

    const metaColumns: Column<Metadata>[] = useMemo(
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
                    }
                ]
            } 
        ],
        []
    );

    const [metadata, setMetadata] = useState(metaData);
    const [skipPageReset, setSkipPageReset] = useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex: number, columnId: any, value: any) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setMetadata(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }

                return row;
            })
        )
    }

    return (
        <div className="min-h-fit flex items-center justify-center">
            <div className="grid grid-cols-3 min-w-max max-w-max px-12">
                <div className="max-w-full col-span-1">
                    <Table columns={txnColumns} data={txnData} />
                </div>
                <div className="col-span-2">
                    <EditableTable
                        account={account}
                        columns={metaColumns}
                        data={metadata}
                        setData={setMetadata}
                        updateMyData={updateMyData}
                        skipPageReset={skipPageReset}
                    />
                </div>
            </div>
        </div>
    );
}

export default Transactions;
