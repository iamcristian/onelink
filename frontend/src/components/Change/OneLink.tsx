import { SocialNetwork } from "@/types/user";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type OneLinkProps = {
  link: SocialNetwork;
};

export default function OneLink({ link }: OneLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-neutral-300 dark:bg-neutral-300 dark:text-black px-2 py-1 flex items-center gap-2 rounded-lg"
      {...attributes}
      {...listeners}
    >
      <div
        className="w-10 h-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <p className="capitalize">
        Visit my: <span className="font-bold">{link.name}</span>
      </p>
    </li>
  );
}
