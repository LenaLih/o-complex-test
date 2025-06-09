import Providers from '@/app/providers';
import './globals.css';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'O-Complex Test',
  description: 'Test task',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
