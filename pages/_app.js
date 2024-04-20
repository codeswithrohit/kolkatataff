import { useRouter } from 'next/router';
import '@/styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isOnAdminPage = router.pathname.includes('/Admin');

  return (
    <>
      {!isOnAdminPage && <Navbar />}
      <Component {...pageProps} />
      {!isOnAdminPage && <Footer />}
    </>
  );
}
