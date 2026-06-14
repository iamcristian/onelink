import { SocialNetwork, UserHandle } from "@/types/user";
import api from "@/config/axios";

type HandleDataProps = {
  data: UserHandle;
};

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
      pageBg: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950",
      cardBg: "bg-white/5 backdrop-blur-md border border-white/10 shadow-xl",
      linkBtn: "bg-white/10 hover:bg-white/15 border border-white/10 hover:scale-[1.03] text-white",
      textClass: "text-neutral-300",
      titleClass: "text-white font-bold",
    },
    sunset: {
      pageBg: "bg-gradient-to-tr from-rose-100 via-orange-50 to-amber-100",
      cardBg: "bg-white/40 backdrop-blur-md border border-white/60 shadow-xl",
      linkBtn: "bg-white/90 hover:bg-white border border-orange-200/50 hover:scale-[1.03] text-slate-800",
      textClass: "text-slate-600",
      titleClass: "text-slate-800 font-extrabold",
    },
    neobrutalism: {
      pageBg: "bg-[#dfebf6]",
      cardBg: "bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
      linkBtn: "bg-yellow-300 hover:bg-yellow-400 border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-black",
      textClass: "text-neutral-900 font-medium",
      titleClass: "text-black font-black",
    },
    minimalist: {
      pageBg: "bg-white dark:bg-neutral-950",
      cardBg: "border border-neutral-200 dark:border-neutral-800 shadow-sm bg-transparent",
      linkBtn: "border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-black dark:text-white",
      textClass: "text-neutral-600 dark:text-neutral-400",
      titleClass: "text-black dark:text-white font-bold",
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
    <div className={`w-full min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${currentTheme.pageBg}`}>
      <div className={`flex flex-col w-full max-w-md h-fit space-y-6 p-6 rounded-2xl ${currentTheme.cardBg}`}>
        <div className="flex flex-col items-center">
          {data.image ? (
            <img
              src={data.image}
              alt={data.handle}
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-blue-500/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center text-3xl font-black text-blue-500 mb-4">
              {data.handle.charAt(0).toUpperCase()}
            </div>
          )}
          <p className={`text-2xl ${currentTheme.titleClass}`}>
            @{data.handle}
          </p>
          <p className={`text-sm text-center mt-2 ${currentTheme.textClass}`}>
            {data.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {links.length ? (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.name)}
                className={`px-5 py-3 flex items-center gap-4 rounded-xl transition-all duration-200 ${currentTheme.linkBtn}`}
              >
                <img
                  src={`/social/icon_${link.name}.svg`}
                  alt={link.name}
                  className="w-8 h-8"
                />
                <p className="capitalize font-bold text-base flex-1">
                  Visit My {link.name}
                </p>
              </a>
            ))
          ) : (
            <p className="text-center text-sm opacity-50">No links added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HandleData;
