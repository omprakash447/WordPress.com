import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function Layout({children}:any) {
    const location=useLocation();

    const hiddenRoutes=["/login" , "/register"];
    const shouldhidden=hiddenRoutes.includes(location.pathname);
  return (
    <>
    {!shouldhidden && <Navbar />}
    <main>
        {children}
    </main>
    </>
  )
}

export default Layout