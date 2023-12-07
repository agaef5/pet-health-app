import NavigationBar from "../../components/Navigation Bar/NavigationBar";

import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <>
      <Outlet />
      <NavigationBar />
    </>
  );
}
