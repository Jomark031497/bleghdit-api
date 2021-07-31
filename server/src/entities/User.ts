import { IsEmail, Length } from "class-validator";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt, { genSalt } from "bcrypt";
import { Exclude } from "class-transformer";

import Entity from "./Entity";
import Post from "./Post";

@TOEntity("users")
export default class User extends Entity {
  // Partial<User> : so that we can create a user without all required fields
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(0, 255, { message: "Email is empty" })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(6, 255, { message: "must be at least 6 characters long" })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(6, 255, { message: "must be at least 6 characters long" })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // Hash the password before saving to database
  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
