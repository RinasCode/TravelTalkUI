import { Outlet } from "react-router-dom";
import { NavbarDefault } from "../components/Navbar";

export default function BaseLayout() {
  return (
    <>
      <NavbarDefault />
      <Outlet />
    </>
  );
}
