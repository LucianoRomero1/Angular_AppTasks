import { User } from "./user.model";

export class Task {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: string,
        public createdAt,
        public updatedAt,
        public user?: User
    ){

    }
}
