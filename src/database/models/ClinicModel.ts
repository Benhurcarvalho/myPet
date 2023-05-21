import { DataTypes, HasManyAddAssociationMixin, Model } from "sequelize";
import sequelize from ".";
import PetModel, { PetAtributes } from "./PetModel";

export interface ClinicAtributes {
    id: number;
    name: string;
    address: string;
    phone: string;
    pets?: PetAtributes[];
}

export type ClinicCreationalAtributes = Omit<ClinicAtributes, 'id'>

class ClinicModel extends Model<ClinicAtributes, ClinicCreationalAtributes> {
    declare id: number;
    declare name: string;
    declare address: string;
    declare phone: string;
    declare pets?: PetModel[];

    declare addPet: HasManyAddAssociationMixin<PetModel, number>;
}

ClinicModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
}, {
    tableName: 'clinics',
    timestamps: false,
    sequelize
})

export default ClinicModel