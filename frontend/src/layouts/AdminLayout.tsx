import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import LinksComponent from "@/components/Change/LinksComponent";
import Loading from "./Loading";

export default function AdminLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  
  if (isError) {
    localStorage.removeItem("token");
    return <Navigate to="/auth/login" />;
  }

  if (data) return <LinksComponent data={data} />;
}
