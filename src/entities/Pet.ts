import ValidationError from "../errors/ValidationError";
import PetSize from "./PetSize";
import PetSizeBig from "./PetSizeBig";
import PetSizeMedium from "./PetSizeMedium";
import PetSizeSmall from "./PetSizeSmall";

type PetParams = {
  id: number;
  name: string;
  age: number;
  breed: string;
  weight: number;
  gender: string;
  userId: number;
}

export default class Pet {
    private id: number;
    private name: string;
    private age: number;
    private breed: string;
    private weight: number;
    private gender: string;
    private userId: number;
    private size: PetSize;

    constructor(params: PetParams) {
        if(params.weight <= 0) throw new ValidationError('Peso inválido')

        this.id = params.id;
        this.name = params.name;
        this.age = params.age;
        this.breed = params.breed;
        this.weight = params.weight;
        this.gender = params.gender;
        this.userId = params.userId
        
        this.size = this.buildPetSize();
    }
    
    private buildPetSize(): PetSize {
        if (this.weight < 15) return new PetSizeSmall();
        if (this.weight < 25) return new PetSizeMedium();
        return new PetSizeBig();
    }

    getRecommendedFood() {
        return this.size.getRecommendedFood();
    }

    getHumanAge() {
        return this.size.getHumanAge(this.age);
    }

    getId() {
    return this.id
   }
   getName() {
    return this.name
   }
   getAge() {
    return this.age
   }
   getBreed() {
    return this.breed
   }
   getWeight() {
    return this.weight
   }
   getGender() {
    return this.gender
   }
   getUserId() {
    return this.userId
   }
}