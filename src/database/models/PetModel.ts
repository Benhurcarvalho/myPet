import { DataTypes, Model } from "sequelize";
import sequelize from ".";
import UserModel from "./UserModel";
import ClinicModel from "./ClinicModel";

export interface PetAtributes {
  id: number;
  name: string;
  age: number;
  breed: string;
  weight: number;
  gender: string;
  userId: number;
}
export type PetCreationAttributes = Omit<PetAtributes, 'id'>;

class PetModel extends Model<PetAtributes, PetCreationAttributes> {
  declare id: number;
  declare name: string;
  declare age: number;
  declare breed: string;
  declare weight: number;
  declare gender: string;
  declare userId: number;
}

PetModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false,
    field: 'user_id'
  }
}, {
  tableName: 'pets',
  timestamps: false,
  sequelize,
});

PetModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  as: 'user',
});

UserModel.hasMany(PetModel, {
  foreignKey: 'user_id',
  as: 'pets',
});

PetModel.belongsToMany(ClinicModel, {
  through: 'clinic_pet',
  as: 'clinics',
  foreignKey: 'clinic_id',
  timestamps: false
});

ClinicModel.belongsToMany(PetModel, {
  through: 'clinic_pet',
  as: 'pets',
  foreignKey: 'pet_id',
  timestamps: false
});

export default PetModel;
