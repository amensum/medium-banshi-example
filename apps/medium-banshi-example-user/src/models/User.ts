import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '@medium-banshi-example/convention';

@Entity()
class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}

export default User;
