import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("text")
	text!: string;

	@Column("text")
	title!: string;
}
