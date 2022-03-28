import React, { useMemo } from "react";
import { useEthers } from "@usedapp/core";

import AccountBalance from "../components/AccountBalance.component";
import FullPage from "../layouts/FullPage";
import Transactions from "../components/Transactions/Transactions.component";
import useAxios from "../shared/hooks/useAxios";
import { useGetTransactions } from "../shared/hooks/transactions/useGetTransactions";
import { getTxnData, getMetadata } from "../components/Transactions/Transactions.services";

const Home = () => {
  // const { account } = useEthers();

  const account = "0x8c469877b27932abdd2313c4b6bf7cff5667fdb9";

  const metadataEntries = useGetTransactions(account);

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
    <FullPage>
      <div className="flex flex-row justify-around text-lg mb-7">
        <AccountBalance />
      </div>
      <div className="flex flex-row justify-around text-lg bg-white border-4 rounded-md py-12">
        {account && <div className="mx-auto">
            {loading && (
                <p>Loading...</p>
            )}
            {error && (
                <p>{error.message}</p>
            )}
            {!loading && !error && (
                <Transactions
                  txnData={txnData}
                  metaData={metaData}
                />
            )}
        </div>}
      </div>
    </FullPage>
  );
};

export default Home;
