import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-12 lg:px-32">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
      <Footer />
    </div>
  );
};

export default MainLayout;
