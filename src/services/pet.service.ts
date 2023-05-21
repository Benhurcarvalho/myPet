import PetModel, { PetAtributes, PetCreationAttributes } from "../database/models/PetModel";

class PetService {
  public static async create(pet: PetCreationAttributes): Promise<PetAtributes> {
    const petCreated = await PetModel.create(pet);
    return petCreated.toJSON();
  }
}

export default PetService;