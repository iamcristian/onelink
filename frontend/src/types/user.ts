export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: SocialNetwork[];
  profileTheme?: string;
};

export type UserHandle = Pick<
  User,
  "description" | "handle" | "image" | "links" | "name" | "profileTheme"
>;

export type ProfileForm = Pick<User, "handle" | "description" | "profileTheme">;

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
  clicks?: number;
};

export type SocialLink = Pick<SocialNetwork, "name" | "url" | "enabled" | "clicks">;
