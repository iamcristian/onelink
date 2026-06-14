import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layouts/AdminLayout";
import Profile from "./pages/Profile";
import Links from "./pages/Links";
import Handle from "./pages/Handle";
import Analytics from "./pages/Analytics";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/auth" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Links />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route path=":handle" element={<Handle />} />

        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
