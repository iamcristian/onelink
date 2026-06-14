import { updateProfile } from "@/api/user";
import { social } from "@/data/social";
import { SocialNetwork, User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils";
import SocialLinkInput from "@/components/SocialLinkInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@headlessui/react";
import { Plus, Trash2, Link2, HelpCircle } from "lucide-react";

const standardNames = ["facebook", "github", "instagram", "x", "youtube", "tiktok", "twitch", "linkedin"];

function Links() {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  // Local state for social links (standard 8)
  const [socialLinks, setSocialLinks] = useState(() => {
    return social.map((item) => {
      const userLink = user.links.find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
  });

  // Local state for custom links (non-standard names)
  const [customLinks, setCustomLinks] = useState<SocialNetwork[]>(() => {
    return user.links.filter((link) => !standardNames.includes(link.name));
  });

  // Sync local states back to react-query user data for live preview
  const syncCache = (updatedSocials: typeof socialLinks, updatedCustoms: typeof customLinks) => {
    const activeStandards = updatedSocials
      .filter((s) => s.url.trim() !== "")
      .map((s) => {
        const existing = user.links.find((l) => l.name === s.name);
        return {
          id: existing ? existing.id : 0,
          name: s.name,
          url: s.url,
          enabled: s.enabled,
          clicks: existing ? existing.clicks : 0,
        };
      });

    const activeCustoms = updatedCustoms.map((c) => ({
      id: c.id,
      name: c.name,
      url: c.url,
      enabled: c.enabled,
      clicks: c.clicks || 0,
    }));

    const combined = [...activeStandards, ...activeCustoms];

    // Re-assign active IDs (1 to N) for sorting sequence, disabled ones receive id = 0
    let enabledCount = 1;
    const finalLinks = combined.map((link) => {
      if (link.enabled && link.url.trim() !== "") {
        return {
          ...link,
          id: link.id > 0 ? link.id : enabledCount++,
        };
      } else {
        return { ...link, id: 0, enabled: false };
      }
    });

    queryClient.setQueryData(["user"], (prevData: User | undefined) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        links: finalLinks,
      };
    });
  };

  // Sync back state if react-query user.links updates (e.g. from drag & drop reordering)
  useEffect(() => {
    if (user?.links) {
      setSocialLinks(
        social.map((item) => {
          const userLink = user.links.find((link) => link.name === item.name);
          if (userLink) {
            return { ...item, url: userLink.url, enabled: userLink.enabled };
          }
          return { ...item, url: "", enabled: false };
        })
      );
      setCustomLinks(user.links.filter((link) => !standardNames.includes(link.name)));
    }
  }, [user?.links]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setSocialLinks(updated);
    syncCache(updated, customLinks);
  };

  const handleEnableLink = (socialNetwork: string) => {
    const target = socialLinks.find((s) => s.name === socialNetwork);
    if (!target) return;

    if (!target.enabled && !isValidUrl(target.url)) {
      toast.error("Please enter a valid URL first (e.g. https://facebook.com/username)");
      return;
    }

    const updated = socialLinks.map((link) =>
      link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link
    );
    setSocialLinks(updated);
    syncCache(updated, customLinks);
  };

  // Custom Links handlers
  const handleAddCustomLink = () => {
    const nextId =
      user.links.length > 0
        ? Math.max(...user.links.map((l) => l.id)) + 1
        : 1;

    const newLink: SocialNetwork = {
      id: nextId,
      name: "My Link",
      url: "",
      enabled: false,
      clicks: 0,
    };

    const updated = [...customLinks, newLink];
    setCustomLinks(updated);
    syncCache(socialLinks, updated);
  };

  const handleCustomNameChange = (id: number, newName: string) => {
    const updated = customLinks.map((link) =>
      link.id === id ? { ...link, name: newName } : link
    );
    setCustomLinks(updated);
    syncCache(socialLinks, updated);
  };

  const handleCustomUrlChange = (id: number, newUrl: string) => {
    const updated = customLinks.map((link) =>
      link.id === id ? { ...link, url: newUrl } : link
    );
    setCustomLinks(updated);
    syncCache(socialLinks, updated);
  };

  const handleCustomToggle = (id: number) => {
    const target = customLinks.find((l) => l.id === id);
    if (!target) return;

    if (!target.enabled && !isValidUrl(target.url)) {
      toast.error("Please enter a valid URL first (e.g. https://yoursite.com)");
      return;
    }

    const updated = customLinks.map((link) =>
      link.id === id ? { ...link, enabled: !link.enabled } : link
    );
    setCustomLinks(updated);
    syncCache(socialLinks, updated);
  };

  const handleRemoveCustomLink = (id: number) => {
    const updated = customLinks.filter((link) => link.id !== id);
    setCustomLinks(updated);
    syncCache(socialLinks, updated);
  };

  const handleSaveChanges = () => {
    // Standard links must have valid URLs if enabled
    const invalidSocial = socialLinks.find((s) => s.enabled && !isValidUrl(s.url));
    const invalidCustom = customLinks.find((c) => c.enabled && !isValidUrl(c.url));

    if (invalidSocial || invalidCustom) {
      toast.error("Please correct invalid URLs or disable them before saving.");
      return;
    }

    // Persist current React Query cache state
    const latestUser = queryClient.getQueryData<User>(["user"])!;
    mutate(latestUser);
  };

  return (
    <div className="w-full space-y-8">
      {/* Social Profiles */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Social Networks
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Enter your social profile URLs and toggle them on to display them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((item) => (
            <SocialLinkInput
              key={item.name}
              item={item}
              handleUrlChange={handleUrlChange}
              handleEnableLink={handleEnableLink}
            />
          ))}
        </div>
      </div>

      {/* Custom Links */}
      <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Custom Links
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Add external portfolios, blogs, projects, or other personal sites.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddCustomLink}
            className="flex items-center gap-1.5 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Custom Link
          </Button>
        </div>

        <div className="space-y-3">
          {customLinks.length > 0 ? (
            customLinks.map((link) => (
              <div
                key={link.id}
                className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xs flex items-center gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
              >
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg text-zinc-500 dark:text-zinc-400">
                  <Link2 className="h-5 w-5" />
                </div>
                <div className="flex-grow space-y-2">
                  <Input
                    type="text"
                    value={link.name}
                    onChange={(e) => handleCustomNameChange(link.id, e.target.value)}
                    placeholder="Link Title (e.g. My Website)"
                    className="text-sm font-semibold border-b border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-none px-0 py-0.5 h-auto focus-visible:ring-0 shadow-none bg-transparent"
                  />
                  <Input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleCustomUrlChange(link.id, e.target.value)}
                    placeholder="URL (https://example.com)"
                    className="text-xs text-zinc-500 dark:text-zinc-400 border-none focus-visible:ring-0 shadow-none p-0 h-auto bg-transparent focus:text-zinc-850 dark:focus:text-zinc-250"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={link.enabled}
                    onChange={() => handleCustomToggle(link.id)}
                    className={`${
                      link.enabled ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-800"
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <span
                      className={`${
                        link.enabled ? "translate-x-5" : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomLink(link.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-sm text-zinc-400 dark:text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/20 flex flex-col items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 opacity-40 text-zinc-400" />
              <span>No custom links added yet.</span>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
        <Button
          onClick={handleSaveChanges}
          disabled={isPending}
          className="px-8 font-semibold shadow-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          {isPending ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default Links;
