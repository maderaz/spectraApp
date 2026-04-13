import { createBrowserRouter } from "react-router";
import { Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { PTBridge } from "./components/PTBridge";
import { FlareRewards } from "./components/FlareRewards";
import { TradingUI } from "./components/TradingUI";
import { Portfolio } from "./components/Portfolio";
import { MetaVaults } from "./components/MetaVaults";
import { MetaVaultDetail } from "./components/MetaVaultDetail";
import { BrandComponents } from "./components/BrandComponents";
import { FixedRates } from "./components/FixedRates";
import { YieldLeverage } from "./components/YieldLeverage";
import { Pools } from "./components/Pools";
import { PoolDetail } from "./components/PoolDetail";
import { ActivityHistory } from "./components/ActivityHistory";

function RedirectToHome() {
  return <Navigate to="/" replace />;
}

function RedirectToPTBridge() {
  return <Navigate to="/pt-bridge" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: TradingUI },
      { path: "portfolio", Component: Portfolio },
      { path: "activity", Component: ActivityHistory },
      { path: "metavaults", Component: MetaVaults },
      { path: "metavaults/:id", Component: MetaVaultDetail },
      { path: "dashboard", Component: Dashboard },
      { path: "trading", Component: RedirectToHome },
      { path: "pt-bridge", Component: PTBridge },
      { path: "rewards", Component: FlareRewards },
      { path: "brand-components", Component: BrandComponents },
      { path: "fixed-rates", Component: FixedRates },
      { path: "yield-leverage", Component: YieldLeverage },
      { path: "pools", Component: Pools },
      { path: "pools/:id", Component: PoolDetail },
      { path: "bridge", Component: RedirectToPTBridge },
      { path: "*", Component: RedirectToHome },
    ],
  },
]);