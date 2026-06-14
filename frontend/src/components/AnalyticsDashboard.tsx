import { SocialNetwork } from "@/types/user";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart2, MousePointerClick } from "lucide-react";

type AnalyticsProps = {
  links: SocialNetwork[];
};

export default function AnalyticsDashboard({ links }: AnalyticsProps) {
  const chartData = links
    .filter((link) => link.enabled && link.url)
    .map((link) => ({
      name: link.name.charAt(0).toUpperCase() + link.name.slice(1),
      clicks: link.clicks || 0,
    }));

  const totalClicks = chartData.reduce((sum, item) => sum + item.clicks, 0);

  const COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#6366f1", // Indigo
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
        <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-950 dark:text-zinc-50">
          <BarChart2 className="h-5 w-5 text-blue-500" />
          Link Analytics
        </h3>
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-sm font-semibold">
          <MousePointerClick className="h-4 w-4" />
          <span>Total Clicks: {totalClicks}</span>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="space-y-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Bar dataKey="clicks" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {chartData.map((item, idx) => (
              <div 
                key={item.name} 
                className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/50"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-xs font-semibold capitalize text-neutral-600 dark:text-neutral-300">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                  {item.clicks}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-sm text-neutral-400 dark:text-neutral-500">
          No click tracking data available. Add and enable links to see statistics.
        </div>
      )}
    </div>
  );
}
