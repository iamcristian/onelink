import { SocialNetwork } from "@/types/user";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link2, GripVertical } from "lucide-react";

type OneLinkProps = {
  link: SocialNetwork;
  theme: string;
};

const standardNames = ["facebook", "github", "instagram", "x", "youtube", "tiktok", "twitch", "linkedin"];

export default function OneLink({ link, theme }: OneLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isStandard = standardNames.includes(link.name.toLowerCase());

  // Theme styling definitions for buttons inside the phone preview
  const buttonStyles: Record<string, string> = {
    midnight: "bg-white/10 hover:bg-white/15 border border-white/10 text-white backdrop-blur-xs",
    sunset: "bg-white/95 border border-orange-200/50 text-slate-800 shadow-sm",
    neobrutalism: "bg-yellow-300 border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black",
    minimalist: "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-xs",
  };

  const currentBtnStyle = buttonStyles[theme] || buttonStyles.midnight;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`px-3 py-2 flex items-center gap-2 rounded-xl transition-colors duration-200 select-none ${currentBtnStyle}`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing opacity-40 hover:opacity-95 p-1 text-current flex-shrink-0"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {isStandard ? (
        <div
          className="w-6 h-6 bg-contain bg-center bg-no-repeat flex-shrink-0"
          style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
        />
      ) : (
        <Link2 className="w-5 h-5 flex-shrink-0 opacity-80" />
      )}

      <p className="text-xs font-bold truncate flex-grow text-center pr-6">
        {isStandard
          ? `Visit My ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}`
          : link.name}
      </p>
    </div>
  );
}
