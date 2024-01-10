import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = () => {
  return (
    <div className="bg-pack-train bg-cover bg-center bg-fixed">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
