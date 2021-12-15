export interface Post {
  identifier: string;
  title: string;
  body?: string;
  slug: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReduxState {
  data: User | null;
  isLoading: boolean;
  error: any;
}
