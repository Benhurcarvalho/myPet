import ClinicModel from "../database/models/ClinicModel";
import UserModel, { UserAtributes, UserCreationalAtributes } from "../database/models/UserModel";

class UserService {
    static async create(user: UserCreationalAtributes): Promise<UserAtributes> {
        const userCreate = await UserModel.create(user);
        return userCreate.toJSON();
    }

    static async findById(id: number): Promise<UserAtributes> {
        const userFound = await UserModel.findOne({
            where: {id},
            include: [
                {
                    model: ClinicModel,
                    as: 'clinic',
                }
            ]
        });
        if(!userFound) {
            throw new Error('Usuário não encontrado')
        }

        return userFound.toJSON()
    }
}

export default UserService;