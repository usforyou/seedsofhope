import { User } from "./user";

export class Trainee extends User {
    id: string;
    modulesCompleted: [string];
}