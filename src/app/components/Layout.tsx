import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex h-screen bg-[#191919] text-white font-['Inter'] overflow-hidden">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto scrollbar-hide pb-[60px] xl:pb-0">
        <Outlet />
      </div>
    </div>
  );
}