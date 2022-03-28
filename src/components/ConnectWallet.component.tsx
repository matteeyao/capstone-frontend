import { useEthers } from "@usedapp/core";
import Button from "./Button.component";

const ConnectWallet = () => {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <div className="fixed top-14 right-20 text-center">
      <Button onClick={() => activateBrowserWallet()}>
        {account ? "Connected" : "Connect"}
      </Button>
    </div>
  );
};

export default ConnectWallet;
