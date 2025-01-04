import { getUserByHandle } from "@/api/user";
import HandleData from "@/components/HandleData";
import Loading from "@/layouts/Loading";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

function Handle() {
  const handle = useParams<{ handle: string }>().handle!;
  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle],
    retry: 1,
  });

  if (isLoading) return <Loading />;
  if (error) return <Navigate to="/404" />;

  if(data) return <HandleData data={data}/>
}

export default Handle;
