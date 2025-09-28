import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Conversation - A quiet space to write and reflect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ backgroundColor: '#1B1D1E', color: '#E5E5E5' }}>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function setViewportHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }
              
              setViewportHeight();
              window.addEventListener('resize', setViewportHeight);
              window.addEventListener('orientationchange', setViewportHeight);
            `,
          }}
        />
      </body>
    </Html>
  );
}
