import { SocialNetwork, User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Outlet } from "react-router";
import OneLink from "./OneLink";
import { Toaster } from "sonner";
import { toast } from "sonner";
import AdminHeader from "../header/AdminHeader";
import NavigationTabs from "../header/NavigationTabs";
import { Copy, ExternalLink, Smartphone } from "lucide-react";

type LinksProps = {
  data: User;
};

const themeBackgrounds: Record<string, string> = {
  midnight: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white",
  sunset: "bg-gradient-to-tr from-rose-200 via-orange-100 to-amber-100 text-slate-800",
  neobrutalism: "bg-[#dfebf6] text-black",
  minimalist: "bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800",
};

const themeCards: Record<string, string> = {
  midnight: "bg-white/5 border border-white/10 backdrop-blur-xs shadow-md",
  sunset: "bg-white/60 border border-white/80 backdrop-blur-xs shadow-md",
  neobrutalism: "bg-white border-[2.5px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]",
  minimalist: "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-xs",
};

const themeTextColors: Record<string, { title: string; desc: string }> = {
  midnight: { title: "text-white font-black", desc: "text-zinc-400" },
  sunset: { title: "text-slate-900 font-black", desc: "text-slate-650" },
  neobrutalism: { title: "text-black font-black", desc: "text-zinc-900 font-bold" },
  minimalist: { title: "text-zinc-900 dark:text-zinc-50 font-black", desc: "text-zinc-500 dark:text-zinc-400" },
};

function LinksComponent({ data }: LinksProps) {
  const enabledLinks = data.links.filter((item: SocialNetwork) => item.enabled);
  const theme = data.profileTheme || "midnight";
  const profileUrl = `${window.location.origin}/${data.handle}`;

  const queryClient = useQueryClient();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.name === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.name === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);

      const disabledLinks: SocialNetwork[] = data.links.filter(
        (item: SocialNetwork) => !item.enabled
      );

      // Re-assign sequential ids for sorting list integrity
      let idCounter = 1;
      const reordered = order.map(link => ({ ...link, id: idCounter++ }));
      const disabledReset = disabledLinks.map(link => ({ ...link, id: 0 }));

      const links = reordered.concat(disabledReset);

      queryClient.setQueryData(["user"], (prevData: User | undefined) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          links: links,
        };
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/20 flex flex-col">
      <AdminHeader />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Navigation Tabs and Profile View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <NavigationTabs />
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg transition-colors border border-zinc-200/50 dark:border-zinc-700/50 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Link
            </button>
            <a
              href={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-xs cursor-pointer hover:shadow-md"
            >
              <span>View Profile</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings & Analytics Editor Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <Outlet />
            </div>
          </div>

          {/* Smartphone Simulator Preview Column */}
          <div className="lg:col-span-5 flex flex-col items-center w-full sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Smartphone className="h-4 w-4" />
              <span>Live Profile Preview</span>
            </div>

            {/* Smartphone device shell mockup */}
            <div className="relative mx-auto w-[310px] h-[610px] rounded-[3.25rem] ring-[12px] ring-zinc-900 dark:ring-zinc-800 shadow-2xl bg-zinc-950 overflow-hidden border-[4px] border-zinc-800/80 flex flex-col">
              {/* Dynamic Island Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-30 flex items-center justify-center" />

              {/* Status bar top placeholders */}
              <div className="absolute top-1.5 left-8 right-8 flex justify-between items-center text-[10px] font-bold text-white z-20 opacity-70">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2 bg-white rounded-[2px]" />
                  <span className="w-3.5 h-2.5 bg-white rounded-[2px]" />
                </div>
              </div>

              {/* Phone screen container */}
              <div className={`flex-grow w-full h-full overflow-y-auto px-3.5 py-7 rounded-[2.75rem] relative flex flex-col no-scrollbar ${themeBackgrounds[theme] || themeBackgrounds.midnight}`}>
                
                {/* Immersive card inside phone screen matching public page */}
                <div className={`flex flex-col w-full h-fit min-h-[95%] space-y-5 p-5 rounded-2xl ${themeCards[theme] || themeCards.midnight}`}>
                  
                  {/* Profile Header Details */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    {data.image ? (
                      <img
                        src={data.image}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-full object-cover mb-3 ring-4 ring-white/10 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl font-black text-blue-500 mb-3">
                        {data.handle.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p className={`text-sm ${themeTextColors[theme]?.title || themeTextColors.midnight.title}`}>
                      @{data.handle}
                    </p>
                    <p className={`text-[10px] text-center mt-2 line-clamp-3 opacity-90 leading-relaxed px-2 ${themeTextColors[theme]?.desc || themeTextColors.midnight.desc}`}>
                      {data.description || "No bio description added yet."}
                    </p>
                  </div>

                  {/* Sortable Links Preview Area */}
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="mt-4 flex flex-col gap-2.5 flex-grow">
                      <SortableContext
                        items={enabledLinks.map(l => l.name)}
                        strategy={verticalListSortingStrategy}
                      >
                        {enabledLinks.length > 0 ? (
                          enabledLinks.map((link) => (
                            <OneLink key={link.name} link={link} theme={theme} />
                          ))
                        ) : (
                          <div className="flex-grow flex items-center justify-center text-center p-4">
                            <p className="text-[10px] opacity-40 italic">
                              No active links to show. Toggle profiles or add custom links in the editor to see them here!
                            </p>
                          </div>
                        )}
                      </SortableContext>
                    </div>
                  </DndContext>
                  
                  {/* Branding info inside card */}
                  <div className="pt-4 border-t border-current/10 text-center opacity-60">
                    <span className="text-[9px] font-bold">
                      Create your own OneLink
                    </span>
                  </div>
                </div>

                {/* Mock bottom home bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-current opacity-30 rounded-full flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default LinksComponent;
