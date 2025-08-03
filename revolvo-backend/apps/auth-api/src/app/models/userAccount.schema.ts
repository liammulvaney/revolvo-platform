import { Column, Entity } from "typeorm";

@Entity({ name: 'useraccounts', synchronize: true }) // tbl name is useraccounts
export class UserAccount {

    @Column({ type: 'uuid', name: 'partitionid', primary: true })
    id!: string; // UUID

    @Column({ type: 'uuid', name: 'partitionid' })
    partitionid!: string; 

    @Column({ type: 'varchar', length: 50, unique: true, name: 'username' })
    username!: string; // unique

    @Column({ type: 'varchar', length: 50, name: 'accountpassword' })
    password!: string; // hashed password

    @Column({ type: 'varchar', length: 100, unique: true, name: 'email' })
    email!: string; // unique

    @Column({ type: 'boolean', name: 'isactive', default: true })
    isActive!: boolean; // default true

    @Column({ type:'timestamp without time zone', name:'createddate', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date; // default current timestamp

    @Column({ type:'timestamp without time zone', name:'modifieddate', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date; // default current timestamp, updated on each change
    
    @Column({ type:'timestamp without time zone', name:'datedeleted',  nullable: true })
    deletedDate?: Date | null; // nullable, set when account is deleted
}