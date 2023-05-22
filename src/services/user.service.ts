import ClinicModel from "../database/models/ClinicModel";
import UserModel, { UserAtributes, UserCreationalAtributes } from "../database/models/UserModel";
import User from "../entities/User";
import UserAdmin from "../entities/UserAdmin";
import NotFoundError from "../errors/NotFoundError";

class UserService {
    static async create(inputUser: UserCreationalAtributes): Promise<UserAtributes> {
        // pega id com o banco
        const id = await UserModel.getNextId();
        // valida o usuário através da class
        const user = UserService.buildUser(id, inputUser)
        // persiste no banco
        const userCreate = await UserModel.create({
            clinicId: user.getClinicId(),
            email: user.getEmail(),
            name: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            id: user.getId(),
        });
        return userCreate.toJSON();
    }

    private static buildUser(id: number, inputUser: UserCreationalAtributes) {
        if (inputUser.role === 'admin') {
            return new UserAdmin({
                ...inputUser,
                id,
            })
        }
        return new User({
            ...inputUser,
            id,
        })
    }

    static async changePassword(id: number, password: string) {
        // recupera e valida operação
        const found = await UserModel.findByPk(id);
        if (!found) throw new NotFoundError('Usuário não encontrado');

        const user = new User({
            clinicId: found.clinicId,
            email: found.email,
            id: found.id,
            name: found.name,
            password: found.password,
            role: found.role
        })
        user.changePassword(password)

        // persistr no banco
        await UserModel.update({
            password: user.getPassword(),
            }, {
                where: { id }
            })
    }

    static async findAll(): Promise<UserAtributes[]> {
        const users = await UserModel.findAll();
        return users.map((user) => user.toJSON())
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
        if(!userFound) throw new NotFoundError('Usuário não encontrado');

        return userFound.toJSON()
    }
}

export default UserService;