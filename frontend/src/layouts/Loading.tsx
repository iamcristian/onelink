import { Skeleton } from "@/components/ui/skeleton"; // Asegúrate de que la ruta sea correcta
import { useTheme } from "@/hooks/use-theme";

const Loading = () => {
  useTheme();
  return (
    <>
      <div className="flex flex-col min-h-screen px-4 md:px-12 lg:px-32">
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
          <Skeleton className="w-32 h-32 rounded-full anipulse" />
          <Skeleton className="w-1/2 h-8 anipulse rounded-md" />
          <Skeleton className="w-3/4 h-6 anipulse rounded-md" />{" "}
          <Skeleton className="w-full h-10 anipulse rounded-md" />{" "}
          <div className="space-y-3 mt-6">
            <Skeleton className="h-10 w-4/5 anipulse rounded-md" />
            <Skeleton className="h-10 w-5/6 anipulse rounded-md" />
            <Skeleton className="h-10 w-3/4 anipulse rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
