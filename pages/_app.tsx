import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { PersistLogin } from "../hoc/PersistLogin";
import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <PersistLogin>
            <Component {...pageProps} />
          </PersistLogin>
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
