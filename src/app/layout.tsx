import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'LocalLink',
  description: 'Minimal Next.js app with Amazon SNS integration',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>LocalLink – Reach your neighbour instantly</title>
        <meta name="description" content="A beautifully minimal Next.js app to reach your neighbour with a single click. Send SMS notifications anonymously and securely via Amazon SNS." />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "s34eekc50w");
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
