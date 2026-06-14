import { SocialNetwork, UserHandle } from "@/types/user";
import api from "@/config/axios";
import { Link2, LinkIcon } from "lucide-react";

type HandleDataProps = {
  data: UserHandle;
};

const standardNames = ["facebook", "github", "instagram", "x", "youtube", "tiktok", "twitch", "linkedin"];

function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = data.links.filter(
    (link: SocialNetwork) => link.enabled
  );

  const theme = data.profileTheme || "midnight";

  // Class mapping for selected themes
  const themeStyles: Record<
    string,
    {
      pageBg: string;
      cardBg: string;
      linkBtn: string;
      textClass: string;
      titleClass: string;
    }
  > = {
    midnight: {
      pageBg: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white",
      cardBg: "bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl",
      linkBtn: "bg-white/10 hover:bg-white/15 border border-white/10 hover:scale-[1.02] text-white active:scale-98",
      textClass: "text-zinc-400",
      titleClass: "text-white font-black tracking-tight",
    },
    sunset: {
      pageBg: "bg-gradient-to-tr from-rose-200 via-orange-100 to-amber-100 text-slate-800",
      cardBg: "bg-white/60 backdrop-blur-md border border-white/80 shadow-2xl",
      linkBtn: "bg-white/95 hover:bg-white border border-orange-200/50 hover:scale-[1.02] text-slate-800 active:scale-98 shadow-sm",
      textClass: "text-slate-650",
      titleClass: "text-slate-900 font-black tracking-tight",
    },
    neobrutalism: {
      pageBg: "bg-[#dfebf6] text-black",
      cardBg: "bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      linkBtn: "bg-yellow-300 hover:bg-yellow-400 border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-black",
      textClass: "text-zinc-900 font-bold",
      titleClass: "text-black font-black tracking-tight",
    },
    minimalist: {
      pageBg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50",
      cardBg: "border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/40",
      linkBtn: "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-[1.01] text-zinc-900 dark:text-zinc-50 active:scale-99 shadow-2xs",
      textClass: "text-zinc-500 dark:text-zinc-400",
      titleClass: "text-zinc-900 dark:text-zinc-50 font-black tracking-tight",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.midnight;

  const handleLinkClick = async (linkName: string) => {
    try {
      await api.post(`/api/user/click/${data.handle}`, { linkName });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-300 select-none ${currentTheme.pageBg}`}>
      {/* Immersive profile card */}
      <div className={`flex flex-col w-full max-w-md h-fit space-y-6 p-8 rounded-3xl ${currentTheme.cardBg} animate-in fade-in slide-in-from-bottom-6 duration-500`}>
        
        {/* Avatar/Header Details */}
        <div className="flex flex-col items-center">
          {data.image ? (
            <img
              src={data.image}
              alt={data.handle}
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-current/10 shadow-md animate-in zoom-in duration-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center text-3xl font-black text-blue-500 mb-4 animate-in zoom-in duration-300">
              {data.handle.charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className={`text-2xl ${currentTheme.titleClass}`}>
            @{data.handle}
          </h1>
          <p className={`text-xs text-center mt-2 leading-relaxed max-w-xs ${currentTheme.textClass}`}>
            {data.description || "No bio description added yet."}
          </p>
        </div>

        {/* Links Grid */}
        <div className="mt-8 flex flex-col gap-3">
          {links.length ? (
            links.map((link, idx) => {
              const isStandard = standardNames.includes(link.name.toLowerCase());
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.name)}
                  className={`px-5 py-3.5 flex items-center gap-4 rounded-xl transition-all duration-200 ${currentTheme.linkBtn} animate-in fade-in slide-in-from-bottom-3 duration-300`}
                  style={{ animationDelay: `${idx * 75}ms`, animationFillMode: "both" }}
                >
                  {isStandard ? (
                    <img
                      src={`/social/icon_${link.name}.svg`}
                      alt={link.name}
                      className="w-7 h-7 flex-shrink-0"
                    />
                  ) : (
                    <Link2 className="w-6 h-6 flex-shrink-0 opacity-80" />
                  )}
                  <span className="font-bold text-sm flex-1 leading-snug">
                    {isStandard 
                      ? `Visit My ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}` 
                      : link.name}
                  </span>
                </a>
              );
            })
          ) : (
            <p className="text-center text-xs opacity-50 italic py-6">No links added yet.</p>
          )}
        </div>

        {/* Bottom Platform Branding */}
        <div className="pt-6 border-t border-current/10 text-center animate-in fade-in duration-700">
          <a
            href="/"
            className={`inline-flex items-center gap-1 text-[11px] font-bold opacity-60 hover:opacity-100 transition-opacity ${
              theme === "midnight" || theme === "minimalist"
                ? "text-zinc-400 dark:text-zinc-500"
                : "text-slate-700"
            }`}
          >
            <LinkIcon className="h-3 w-3" />
            <span>Create your own OneLink</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HandleData;
