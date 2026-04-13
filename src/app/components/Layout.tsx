import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-[#191919] text-white font-['Inter'] overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 min-w-0 pb-[60px] xl:pb-0">
        <Outlet />
      </div>
    </div>
  );
}