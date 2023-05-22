export type RecommendedFood = {
    min: number,
    max: number
};

export default abstract class PetSize {
    abstract getRecommendedFood(): RecommendedFood;
    abstract getHumanAge(age: number): number;
}