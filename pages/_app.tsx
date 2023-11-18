import type { AppProps } from "next/app";
import React from "react";
import Layout from "../app/layout";

type Props = {};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
