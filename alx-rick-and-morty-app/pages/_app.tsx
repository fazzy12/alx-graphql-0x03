import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/graphql/apolloClient";
import ErrorBoundary from "@/components/ErrorBoundary";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap the entire component tree with the ErrorBoundary
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
