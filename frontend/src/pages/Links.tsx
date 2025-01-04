import { updateProfile } from "@/api/user";
import { social } from "@/data/social";
import { SocialNetwork, User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils";
import SocialLinkInput from "@/components/SocialLinkInput";
import { Button } from "@/components/ui/button";

function Links() {
  const [socialLinks, setSocialLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  useEffect(() => {
    const updatedData = socialLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
    setSocialLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setSocialLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = socialLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Invalid URL");
        }
      }
      return link;
    });

    setSocialLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );
    if (selectSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return { ...link, id: 0, enabled: false };
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return { ...link, id: link.id - 1 };
        } else {
          return link;
        }
      });
    }

    queryClient.setQueryData(["user"], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedItems) };
    });
  };

  return (
    <>
      <div className="w-3/4 md:w-1/2 lg:w-1/3 space-y-2">
        {socialLinks.map((item) => (
          <SocialLinkInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <Button
          className="w-full uppercase font-bold"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}

export default Links;
