import ConnectWallet from "../components/ConnectWallet.component";

interface Props {
  children: React.ReactNode;
}

const FullPage = ({ children }: Props) => {
  return (
    <div className="p-16 min-h-screen bg-gradient-to-tr from-gray-200 to-white-300">
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl">Transaction Ledger</h1>
      </div>
      <div>
        <div>
          <ConnectWallet />
        </div>
        {children}
      </div>
    </div>
  );
};

export default FullPage;
