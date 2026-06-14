import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"])!;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Link Analytics
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Track clicks performance, total audience engagement, and comparative stats.
        </p>
      </div>
      <AnalyticsDashboard links={user.links} />
    </div>
  );
}
