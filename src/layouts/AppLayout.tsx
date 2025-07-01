import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AppLayout: React.FC = () => {
  return (
    <div className="" >
      <Navbar />
      < main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
