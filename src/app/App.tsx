import { router } from "./routes.tsx";
import { RouterProvider } from "react-router";

export default function App() {
  return <RouterProvider router={router} />;
}