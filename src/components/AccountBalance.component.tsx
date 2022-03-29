import { formatEther } from "ethers/lib/utils";
import { useEthers, useEtherBalance } from "@usedapp/core";

const AccountBalance = () => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <div className="w-full text-center text-sm">
      <p>
        <b>Account</b>: <span>{account ? account : "Please connect your wallet."}</span>
      </p>
      <p>
        <b>Balance</b>: <span>
          {etherBalance ? 
            formatEther(etherBalance).slice(0, 8) + " ETH" :
            "Unable to locate balance."
          }
        </span>
      </p>
    </div>
  );
};

export default AccountBalance;
