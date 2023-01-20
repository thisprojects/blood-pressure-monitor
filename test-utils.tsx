import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "./config/theme";
import createEmotionCache from "./config/createEmotionCache";
import ContextWrapper from "./components/ContextWrapper";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options } as any);

const AllTheProviders = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ContextWrapper>
          <Component {...pageProps} />
        </ContextWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export * from "@testing-library/react";
export { customRender as render };
