import PetSize, { RecommendedFood } from "./PetSize";

export default class PetSizeSmall extends PetSize {
    // transforma o método em aero func por conta do lint
    getRecommendedFood = (): RecommendedFood => {
        return {
            max: 135,
            min: 95
        };
    }
    getHumanAge = (age: number): number => {
        if(age <= 2) return age * 12.5;

        const firstTwoYear = 12.5 * 2;
        const restYear = (age - 2) * 4.5;

        return firstTwoYear + restYear;
    }
}