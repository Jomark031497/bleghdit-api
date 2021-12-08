import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Post from "./Post";
import RootEntity from "./RootEntity";
import User from "./User";

@Entity("subs")
export default class Subs extends RootEntity {
  constructor(sub: Partial<Subs>) {
    super();
    Object.assign(this, sub);
  }

  @Column({ unique: true })
  @Index()
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageURN: string;

  @Column({ nullable: true })
  bannerURN: string;

  // There can be multiple subleddits owned by a one user
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  // there can be multiple posts in one sub
  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];
}
