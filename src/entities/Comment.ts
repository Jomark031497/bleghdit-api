import { makeID } from "../utils/helpers";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Post from "./Post";
import RootEntity from "./RootEntity";
import User from "./User";

@Entity("comments")
export default class Comment extends RootEntity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Index()
  @Column()
  identifier: string; // 8 character string

  @Column({ type: "text" })
  body: string;

  @Column()
  username: string;

  // A User can have multiple comments
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  // A Post can have multiple comments
  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  // Lifecycle hook to create a identifier
  @BeforeInsert()
  makeId() {
    this.identifier = makeID(8);
  }
}
