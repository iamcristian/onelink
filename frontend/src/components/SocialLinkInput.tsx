import { SocialLink } from "@/types/user";
import { Switch } from "@headlessui/react";
import { classNames } from "@/lib/utils";
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
  return (
    <div className="bg-neutral-300 p-2 flex items-center gap-3 rounded-lg">
      <div
        className="w-8 h-8"
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
      ></div>
      <Input
        type="text"
        className="flex-1 text-black font-semibold"
        value={item.url}
        onChange={handleUrlChange}
        name={item.name}
      />
      <Switch
        checked={item.enabled}
        onChange={() => handleEnableLink(item.name)}
        className="bg-black relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <span
          className={classNames(
            item.enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-neutral-300 shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}

export default SocialLinkInput;
