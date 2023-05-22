import ValidationError from "../errors/ValidationError";
import User, { UserParams } from "./User";

export default class UserAdmin extends User {
    constructor(params: UserParams) {
        if (params.email.endsWith('@pettrybe.com')) {
            throw new ValidationError('Domínio de email incorreto')
        }

        super(params)
    }
}