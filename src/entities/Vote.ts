import { Column, ManyToOne, JoinColumn, Entity } from "typeorm";

import Post from "./Post";
import User from "./User";
import Comment from "./Comment";
import RootEntity from "./RootEntity";

@Entity("votes")
export default class Vote extends RootEntity {
  constructor(vote: Partial<Vote>) {
    super();
    Object.assign(this, vote);
  }

  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
