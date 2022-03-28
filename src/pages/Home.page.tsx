import AccountBalance from "../components/AccountBalance.component";
import FullPage from "../layouts/FullPage";
import { useEthers } from "@usedapp/core";
import Transactions from "../components/Transactions/Transactions.component";

const Home = () => {
  const { account } = useEthers();

  return (
    <FullPage>
      <div className="flex flex-row justify-around text-lg mb-7">
        <AccountBalance />
      </div>
      <div className="flex flex-row justify-around text-lg bg-white border-4 rounded-md py-12">
        {account && <Transactions account={account} />}
      </div>
    </FullPage>
  );
};

export default Home;
