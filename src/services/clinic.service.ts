import ClinicModel, { ClinicAtributes, ClinicCreationalAtributes } from "../database/models/ClinicModel";
import PetModel from "../database/models/PetModel";

class ClinicService {
    static async create(clinic: ClinicCreationalAtributes): Promise<ClinicAtributes> {
        const clinicCreate = await ClinicModel.create(clinic);
        return clinicCreate.toJSON()
    }

    static async addPet(idPet: number, idClinic: number): Promise<void> {
        const clinic = await ClinicModel.findOne({ where: {id: idClinic } });
        if (!clinic) throw new Error('Clinica não encontrada');

        await clinic.addPet(idPet);
    }

    static async findAll(): Promise<ClinicAtributes[]> {
        const clinics = await ClinicModel.findAll({
            include: [
                {
                    model: PetModel,
                    as: 'pets'
                }
            ]
        });
        return clinics.map(ClinicService.buildClinicWithpets);
    }

    private static buildClinicWithpets(clinic: ClinicModel): ClinicAtributes {
        const clinicAtributes = clinic.toJSON();
        clinicAtributes.pets = clinic.pets ? clinic.pets.map((petModel) => petModel.toJSON()) : [];
        return clinicAtributes;
    }
}

export default ClinicService;