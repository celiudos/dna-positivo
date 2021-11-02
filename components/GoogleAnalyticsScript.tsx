import Script from "next/script";
import * as React from "react";
import packageJson from "../package.json";

export default function GoogleAnalyticsScript() {
  return process.env.NODE_ENV === "production" ? (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
            gtag('set', 'appVersion', ${packageJson.version});
        `}
      </Script>
    </>
  ) : null;
}
