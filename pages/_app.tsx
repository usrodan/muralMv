import "@/css/index.css";
import Head from "next/head";
import Layout from "@/components/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head children={""} />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}

export default MyApp;
