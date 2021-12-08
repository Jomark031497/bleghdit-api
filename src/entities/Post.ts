import { makeID, slugify } from "../utils/helpers";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import RootEntity from "./RootEntity";
import User from "./User";

@Entity("posts")
export default class Post extends RootEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 character ID

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subredditName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @BeforeInsert()
  makeIDandSlug() {
    this.identifier = makeID(7);
    this.slug = slugify(this.title);
  }
}
