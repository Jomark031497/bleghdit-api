import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Post from "./Post";
import RootEntity from "./RootEntity";
import User from "./User";
import { makeID } from "../utils/helpers";
import Vote from "./Vote";
import { Expose } from "class-transformer";

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
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  // A Comment can have many votes
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  // virtual field: get the voteScore of a comment
  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  // virtual field
  protected userVote: number;
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  // Lifecycle hook to create a identifier
  @BeforeInsert()
  makeId() {
    this.identifier = makeID(8);
  }
}
