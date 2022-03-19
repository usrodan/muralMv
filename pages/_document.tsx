import React from 'react'
import Document, { Html, Head, Main, NextScript } from "next/document";

import { ToastContainer } from 'react-toastify';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Pacifico&display=swap" rel="stylesheet"></link>
          {/*<GoogleAnalytics id="UA-44242617-11"/> */}

          
          <script nonce='8JViWmwJBu' dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener("load",function(){
              const script = document.createElement("script");
              script.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6873518969054710";
              document.body.appendChild(script);
            }) `}} /> 
          
        </Head>
        <body>
          <Main />
          <NextScript />
          <ToastContainer />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
