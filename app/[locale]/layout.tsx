import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Inter } from 'next/font/google'; // Assuming 'Inter' font is used, adjust if necessary
import '../globals.css'; // Adjust path if your globals.css is elsewhere
import { ThemeProvider } from '@/components/theme-provider'; // Assuming this path is correct

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
