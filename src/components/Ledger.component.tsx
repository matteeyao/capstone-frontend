import React, { useMemo }  from "react";

import Transactions from "../components/Transactions/Transactions.component";
import useAxios from "../shared/hooks/useAxios";
import { Hash, useFetchTransactions } from "../shared/hooks/transactions/useFetchTransactions";
import { getTxnData, getMetadata } from "../components/Transactions/Transactions.services";
import { Metadata } from "../shared/interfaces/transaction/metadata.interface";

interface Props {
    account: string | null | undefined;
}

const Ledger = ({ account }: Props) => {

    const metadataEntries: Hash<Metadata> = useFetchTransactions(account);

    const { response, loading, error } = useAxios({
        method: "get",
        url: `/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=4YT69IDTQ4BWK3QRH24AGQ4YHSC28Q1AYV`,
        headers: {
            accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

  const txnData = useMemo(() => getTxnData(response), [response]);
  const metaData = useMemo(() => getMetadata(response, metadataEntries), [response, metadataEntries]);

    return (
        <div className="flex flex-row justify-around text-lg bg-white border-4 rounded-md py-6">
            {account && <div className="flex">
                {loading && (
                    <p>Loading...</p>
                )}
                {error && (
                    <p>{error.message}</p>
                )}
                {!loading && !error && (
                    <Transactions
                    account={account}
                    txnData={txnData}
                    metaData={metaData}
                    />
                )}
            </div>}
      </div>
    );
};

export default Ledger;
