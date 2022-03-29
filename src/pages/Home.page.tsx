import React from "react";
import { useEthers } from "@usedapp/core";

import AccountBalance from "../components/AccountBalance.component";
import FullPage from "../layouts/FullPage";
import Ledger from "../components/Ledger.component";

const Home = () => {
  const { account } = useEthers();

  // const account = "0x8c469877b27932abdd2313c4b6bf7cff5667fdb9";

  return (
    <FullPage>
      <div className="flex flex-row justify-around text-lg mb-7">
        <AccountBalance />
      </div>
      {account && <Ledger account={account} />}
    </FullPage>
  );
};

export default Home;
