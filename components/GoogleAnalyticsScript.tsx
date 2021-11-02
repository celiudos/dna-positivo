import Script from "next/script";
import * as React from "react";

export default function GoogleAnalyticsScript() {
  return process.env.NODE_ENV === "production" ? (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1795HP39M2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1795HP39M2');
        `}
      </Script>
    </>
  ) : null;
}
