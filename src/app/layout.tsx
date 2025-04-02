import localFont from 'next/font/local';

import type { Metadata } from 'next';
import './globals.css';

const productSans = localFont({
  src: [
    {
      path: '../../public/fonts/Product-Sans-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Product-Sans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Product-Sans-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/Product-Sans-Bold-Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-product-sans',
});

export const metadata: Metadata = {
  title: 'Zephyr',
  description: 'Zephyr is an llm powered chatbot.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${productSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
