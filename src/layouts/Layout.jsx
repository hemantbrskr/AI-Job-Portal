import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <div className="grid-bg"></div>
      <Header />
      <main className="container min-h-screen">
        <Outlet />
      </main>
      <footer className="mt-10 bg-gray-800 p-10 text-center">
        <p>&copy;  All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
