import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import {
    useRowSelect,
    useTable
} from "react-table";
import { useMutation } from "@apollo/client";

import defaultColumn from "./EditableCell.component";
import { CREATE_TRANSACTION_METADATA } from "../../shared/hooks/transactions/createTransactionMetadata";
import { UPDATE_TRANSACTION_METADATA } from "../../shared/hooks/transactions/updateTransactionMetadata";
import { createOrUpdateTransactionMetadata } from "./EditableTable.services";

// Be sure to pass our updateMyData and the skipPageReset option
const EditableTable: any = ({
    account,
    columns,
    data,
    setData,
    updateMyData,
    skipPageReset
}: InferProps<typeof EditableTable.propTypes>) => {
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [addTransactionMetadata] = useMutation(CREATE_TRANSACTION_METADATA);
    const [updateTransactionMetadata] = useMutation(UPDATE_TRANSACTION_METADATA);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }: any = useTable(
        {
            columns,
            data,
            defaultColumn,
            // use the skipPageReset option to disable page resetting temporarily
            autoResetPage: !skipPageReset,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,
            // pass state variables so that we can access them in edit hook later
            editableRowIndex,
            setEditableRowIndex // setState hook for toggling edit on/off switch
        } as any,
        useRowSelect,
        (hooks) => {
            hooks.allColumns.push((columns) => [
                ...columns,
                // pass edit hook
                {
                    Header: "",
                    accessor: "edit",
                    id: "edit",
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }: any) => (
                        <button
                            className="action-button min-w-[40px] bg-neutral-100 hover:text-gray-400 rounded-m font-medium"
                            onClick={() => {
                                const currentIndex = row.index;
                                if (editableRowIndex !== currentIndex) {
                                    // row requested for edit access
                                    setEditableRowIndex(currentIndex);
                                } else {
                                    // request for saving the updated row
                                    setEditableRowIndex(null);

                                    const prevEntry = data[editableRowIndex];

                                    const updatedRow = {
                                        address: account,
                                        txnHash: prevEntry.txnHash,
                                        ...row.values
                                    };
                                    // console.log("---Updated row values:");
                                    // console.log(updatedRow);
                                    // call your updateRow API
                                    createOrUpdateTransactionMetadata({
                                        prevEntry,
                                        newEntry: updatedRow,
                                        idx: editableRowIndex,
                                        data: data,
                                        create: addTransactionMetadata,
                                        update: updateTransactionMetadata,
                                        setData,
                                    });
                                }
                            }}
                        >
                            {/* single action button supporting 2 modes */}
                            {editableRowIndex !== row.index ? "Edit" : "Save"}
                        </button>
                    )
                }
            ]);
        }
    );

    // Render the UI for your table
    return (
        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-2">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead>
                                {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th 
                                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            {...column.getHeaderProps()}
                                        >{column.render("Header")}</th>
                                    ))}
                                </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                {rows.map((row: { getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }, i: any) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return <td 
                                                    {...cell.getCellProps()}
                                                    className="text-sm px-3 py-3 whitespace-nowrap"
                                                >{cell.render("Cell")}</td>;
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

EditableTable.propTypes = {
    account: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    updateMyData: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    skipPageReset: PropTypes.bool.isRequired
};

export default EditableTable;
