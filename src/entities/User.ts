import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { genSalt, hash } from "bcrypt";
import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import RootEntity from "./RootEntity";
import Post from "./Post";

@Entity("users")
export default class User extends RootEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @Length(3, 255, { message: "Username must be at least 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail(undefined, { message: "must be a valid email address" })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: "Username must be at least 6characters long" })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // lifecycle hook to hash password before saving
  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
