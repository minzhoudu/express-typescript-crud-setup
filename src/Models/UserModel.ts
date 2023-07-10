import { Column, Entity, BaseEntity, OneToMany, PrimaryColumn, Exclusion } from "typeorm";

import { Post } from "./PostsModel";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner",
}

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({ type: "uuid" })
    id: string;

    @Column("text")
    name: string;

    @Column("text", { unique: true })
    email: string;

    @Column("text", { select: false })
    password: string;

    @Column("int", { nullable: true })
    age: number;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: "user" | "admin" | "owner";

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}
