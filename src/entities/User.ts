import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { genSalt, hash } from "bcrypt";
import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import RootEntity from "./RootEntity";
import Post from "./Post";
import Vote from "./Vote";

@Entity("users")
export default class User extends RootEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Column({ unique: true })
  @Index()
  @Length(3, 255, { message: "Username must be at least 3 characters long" })
  username: string;

  @Index()
  @Column({ unique: true })
  @IsEmail(undefined, { message: "must be a valid email address" })
  email: string;

  @Column()
  @Exclude()
  @Length(6, 255, { message: "Username must be at least 6 characters long" })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
