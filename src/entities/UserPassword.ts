import ValidationError from "../errors/ValidationError";

export default class UserPassword {
    static minLength = 8;

  constructor(
    private value: string,
  ) {
    if(value.length < UserPassword.minLength) {
        throw new ValidationError('Senha muito curta');
    }
  }

  getValue() {
    return this.value;
  }
}
