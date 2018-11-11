import { User } from "./user";

export class Admin extends User {
    id: string;
    centersManaged: [string];
}