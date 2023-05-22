import PetSize, { RecommendedFood } from "./PetSize";

export default class PetSizeMedium extends PetSize {
    // transforma o método em aero func por conta do lint
    getRecommendedFood = (): RecommendedFood => {
        return {
            max: 320,
            min: 160,
        };
    }
    getHumanAge = (age: number): number => {
        if(age <= 2) return age * 10.5;

        const firstTwoYear = 10.5 * 2;
        const restYear = (age - 2) * 5.7;

        return firstTwoYear + restYear;
    }
}