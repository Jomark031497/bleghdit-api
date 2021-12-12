export interface Post {
  identifier: string;
  title: string;
  body?: string;
  slug: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

export interface User {
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
