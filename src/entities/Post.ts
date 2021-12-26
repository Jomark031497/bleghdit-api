import { makeID, slugify } from "../utils/helpers";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import RootEntity from "./RootEntity";
import User from "./User";
import Subs from "./Subleddit";
import Comment from "./Comment";
import Vote from "./Vote";
import { Expose } from "class-transformer";

@Entity("posts")
export default class Post extends RootEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 Character Id

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @Column()
  username: string;

  // A User can have multiple posts
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  // A Sub can have multiple posts
  @ManyToOne(() => Subs, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Subs;

  // A Post can have multiple comments
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  // A Post can have multiple votes
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  // exposed virtual field to show voteScore
  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  protected userVote: number;
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  // Lifecycle hook to create a slug and identifier
  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeID(7);
    this.slug = slugify(this.title);
  }
}
