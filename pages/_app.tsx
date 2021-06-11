import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import appTheme from "src/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MotionConfig, AnimationFeature, GesturesFeature } from "framer-motion";
import "@fontsource/biorhyme/300.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/yantramanav/300.css";
import "@fontsource/yantramanav/400.css";
import "@fontsource/fira-code/400.css";
import "src/theme/css/global.css";
import Layout from "src/components/Layout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const seoTitle = "Liam Davis | Web Developer";
  const seoDescription =
    "Liam Davis is a full-stack web developer with 2 years of professional experience and 1 in project management. He specializes in Next.js/React development with a Node.js/PostgreSQL back-end.";

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          url: `https://liamdavis.dev/${router.route}`,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: "https://res.cloudinary.com/gamma-guys-studio/image/upload/v1619743307/logoDark_r285pd.png",
              width: 794,
              height: 1123,
              alt: "Liam Davis Web Development - Dark Logo",
            },
            {
              url: "https://res.cloudinary.com/gamma-guys-studio/image/upload/v1619743307/logoLight_f3a9lv.png",
              width: 794,
              height: 1123,
              alt: "Liam Davis Web Development - Light Logo",
            },
          ],
        }}
      />
      <Head>
        <title>Liam Davis | Web Developer</title>

        <meta content="#252627" name="theme-color" />
        <meta content="#252627" name="msapplication-navbutton-color" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="#252627" name="apple-mobile-web-app-status-bar-style" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />

        {typeof window !== "undefined" &&
          window.location.hostname === "liamdavis.dev" && (
            <script
              async
              defer
              data-domain="liamdavis.dev"
              src="https://stats.liamdavis.dev/js/index.js"
            />
          )}
      </Head>
      <ChakraProvider theme={appTheme}>
        <CSSReset />
        <MotionConfig features={[AnimationFeature, GesturesFeature]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MotionConfig>
      </ChakraProvider>
    </>
  );
};

export default App;
