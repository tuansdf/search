import IndexPage from "@/index.page.tsx";
import SettingsPage from "@/settings.page.tsx";
import { Navigate, Router } from "@solidjs/router";

const routes = [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/settings",
    component: SettingsPage,
  },
  {
    path: "/*",
    component: () => <Navigate href="/" />,
  },
];

export default function App() {
  return <Router>{routes}</Router>;
}
