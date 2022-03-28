import { ApolloProvider } from "@apollo/client";

import client from './shared/apollo-client';
import Router from "./routes";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
