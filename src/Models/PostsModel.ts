import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { User } from "./UserModel";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @Column("date", { default: new Date() })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}
