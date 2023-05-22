import PetModel, { PetAtributes, PetCreationAttributes } from "../database/models/PetModel";
import Pet from "../entities/Pet";
import { RecommendedFood } from "../entities/PetSize";

type FindAllPetsOutput = {
  id: number;
  name: string;
  age: number;
  breed: string;
  weight: number;
  gender: string;
  userId: number;
  humanAge: number;
  recommendedFood: RecommendedFood;
}

class PetService {
  public static async create(pet: PetCreationAttributes): Promise<PetAtributes> {
    const petCreated = await PetModel.create(pet);
    return petCreated.toJSON();
  }

  public static async findAll() {
    const pets = await PetModel.findAll();
    const newPets = pets.map(PetService.toInstance);
    return newPets.map<FindAllPetsOutput>(PetService.toOutput)
  }

  private static toInstance(model: PetModel): Pet {
    return new Pet({
      id: model.id,
      name: model.name,
      age: model.age,
      breed: model.breed,
      weight: model.weight,
      gender: model.gender,
      userId: model.userId,
    })
  }

  private static toOutput(pet: Pet): FindAllPetsOutput {
    return {
      id: pet.getId(),
      name: pet.getName(),
      age: pet.getAge(),
      breed: pet.getBreed(),
      weight: pet.getWeight(),
      gender: pet.getBreed(),
      userId: pet.getUserId(),
      humanAge: pet.getHumanAge(),
      recommendedFood: pet.getRecommendedFood(),
    };
  }
}

export default PetService;