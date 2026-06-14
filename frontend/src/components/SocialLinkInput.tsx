import { SocialLink } from "@/types/user";
import { Switch } from "@headlessui/react";
import { Input } from "./ui/input";

type SocialItemProps = {
  item: SocialLink;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnableLink: (socialLink: string) => void;
};

function SocialLinkInput({
  item,
  handleUrlChange,
  handleEnableLink,
}: SocialItemProps) {
  const capitalized = item.name.charAt(0).toUpperCase() + item.name.slice(1);

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700/80 p-3.5 flex items-center gap-3.5 rounded-xl shadow-xs transition-all duration-200">
      {/* Icon */}
      <div
        className="w-8 h-8 bg-contain bg-center bg-no-repeat flex-shrink-0"
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
        title={capitalized}
      />

      {/* Input */}
      <div className="flex-1 space-y-1">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          {capitalized}
        </label>
        <Input
          type="text"
          placeholder={`https://${item.name}.com/username`}
          className="h-8 px-2 py-1 text-xs font-medium bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-blue-500 dark:text-zinc-100 rounded-md shadow-none"
          value={item.url}
          onChange={handleUrlChange}
          name={item.name}
        />
      </div>

      {/* Toggle switch */}
      <div className="flex items-center self-end pb-1">
        <Switch
          checked={item.enabled}
          onChange={() => handleEnableLink(item.name)}
          className={`${
            item.enabled ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-800"
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        >
          <span
            className={`${
              item.enabled ? "translate-x-5" : "translate-x-0"
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </div>
  );
}

export default SocialLinkInput;
