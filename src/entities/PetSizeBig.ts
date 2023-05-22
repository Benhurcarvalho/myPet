import PetSize, { RecommendedFood } from "./PetSize";

export default class PetSizeBig extends PetSize {
    // transforma o método em aero func por conta do lint
    getRecommendedFood = (): RecommendedFood => {
        return {
            max: 530,
            min: 320
        };
    }
    getHumanAge = (age: number): number => {
        if(age <= 2) return age * 9;

        const firstTwoYear = 9 * 2;
        const restYear = (age - 2) * 8;

        return firstTwoYear + restYear;
    }

}