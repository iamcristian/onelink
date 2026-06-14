import { SocialNetwork, User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Link, Outlet } from "react-router";
import OneLink from "./OneLink";
import { Toaster } from "sonner";
import AdminHeader from "../header/AdminHeader";
import NavigationTabs from "../header/NavigationTabs";
import AnalyticsDashboard from "../AnalyticsDashboard";

type LinksProps = {
  data: User;
};

function LinksComponent({ data }: LinksProps) {
  const enabledLinks = data.links.filter((item: SocialNetwork) => item.enabled);

  const queryClient = useQueryClient();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);

      const disabledLinks: SocialNetwork[] = data.links.filter(
        (item: SocialNetwork) => !item.enabled
      );

      const links = order.concat(disabledLinks);

      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: links,
        };
      });
    }
  };

  return (
    <div className="flex flex-col px-4 md:px-12 lg:px-32">
      <AdminHeader />
      <main className="mx-auto w-full">
        <NavigationTabs />
        <div className="flex justify-end">
          <Link
            className="font-bold text-right underline"
            to={`/${data.handle}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            View My Profile /{data.handle}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 justify-center pt-4 md:mt-12">
          {/* Settings & Analytics Column */}
          <div className="flex-1 w-full max-w-2xl flex flex-col gap-6">
            <Outlet />
            <AnalyticsDashboard links={data.links} />
          </div>

          {/* Preview Panel Column */}
          <div className="w-full lg:w-80 h-fit space-y-5 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Profile Preview</h3>
            <div className="flex flex-col items-center">
              {data.image ? (
                <img
                  src={data.image}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center text-3xl font-black text-blue-500 mb-4">
                  {data.handle.charAt(0).toUpperCase()}
                </div>
              )}
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                @{data.handle}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-2">
                {data.description}
              </p>
            </div>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="mt-8 flex flex-col gap-2">
                <SortableContext
                  items={enabledLinks}
                  strategy={verticalListSortingStrategy}
                >
                  {enabledLinks.map((link) => (
                    <OneLink key={link.name} link={link} />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </div>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default LinksComponent;
