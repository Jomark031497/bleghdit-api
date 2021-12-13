import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
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
  value: number; // vote value: -1(downvote), 0(remove vote), 1(upvote)

  @Column()
  username: string;

  // A User can have many votes
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  // A Post can have many votes
  @ManyToOne(() => Post)
  post: Post;

  // A Comment can have many votes
  @ManyToOne(() => Comment)
  comment: Comment;
}
