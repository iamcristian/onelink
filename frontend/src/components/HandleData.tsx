import { SocialNetwork, UserHandle } from "@/types/user";

type HandleDataProps = {
  data: UserHandle;
};

function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="w-full min-h-screen flex mt-10 justify-center">
      <div className="flex flex-col w-3/4 md:w-1/2 lg:w-1/3 h-fit space-y-5 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Profile Preview</h3>
        <div className="flex flex-col items-center">
          {data.image && (
            <img
              src={data.image}
              alt={data.handle}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {data.handle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-2">
            {data.description}
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-2">
          {links.length ? (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              >
                <img
                  src={`/social/icon_${link.name}.svg`}
                  alt={link.name}
                  className="w-12"
                />
                <p className="text-black capitalize font-bold text-lg">
                  Visit My {link.name}
                </p>
              </a>
            ))
          ) : (
            <p className="text-center">No hay links</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HandleData;
