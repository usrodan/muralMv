import "@/css/index.css";
import Head from "next/head";
import Layout from "@/components/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apollo";
import Script from 'next/script'
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
      </Head>
      <ApolloProvider client={client}>
        <Script id="google-ads" strategy="afterInteractive" nonce='8JViWmwJBu' >
          {`
            window.addEventListener("load",function(){
              const script = document.createElement("script");
              script.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6873518969054710";
              document.body.appendChild(script);
            }) 
          `}
        </Script>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-7MKJYHFTPR" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7MKJYHFTPR');
            `}
        </Script>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}

export default MyApp;
