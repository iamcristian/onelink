export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

export type UserHandle = Pick<
  User,
  "description" | "handle" | "image" | "links" | "name"
>;

export type ProfileForm = Pick<User, "handle" | "description">;

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type SocialLink = Pick<SocialNetwork, "name" | "url" | "enabled">;
