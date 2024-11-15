import AuthProvider from '@/context/AuthProvider';
import '../globals.css';

export const metadata = {
  title: 'Authentication',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata like title and description should go here if needed */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
