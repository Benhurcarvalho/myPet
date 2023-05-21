import { DataTypes, Model } from "sequelize";
import sequelize from ".";
import ClinicModel, { ClinicAtributes } from "./ClinicModel";

export interface UserAtributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  clinicId: number;
  clinic?: ClinicAtributes;
}

export type UserCreationalAtributes = Omit<UserAtributes, 'id'>;

class UserModel extends Model<UserAtributes, UserCreationalAtributes> implements UserAtributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare clinicId: number;
}

UserModel.init({
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
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  },
  clinicId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clinics',
      key: 'id'
    },
    allowNull: false,
  }
},
  {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    sequelize,
  });

UserModel.belongsTo(
  ClinicModel, { 
    foreignKey: 'clinic_id',
    as: 'clinic' }
);

ClinicModel.hasMany(
  UserModel, {
    foreignKey: 'clinic_id',
    as: 'users' }
);

export default UserModel;