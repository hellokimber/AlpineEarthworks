import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToHash from "./ScrollToHash.jsx";

export default function Layout() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-stone-950 text-stone-100">
      <ScrollToHash />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
