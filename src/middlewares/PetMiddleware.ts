import { NextFunction, Request, Response } from 'express';
import ValidationError from '../errors/ValidationError';

export default class PetMiddleware {
  static validateCreate(req: Request, res: Response, next: NextFunction) {
    if (!req.body.name) throw new ValidationError('Nome obrigatório');
    if (!req.body.age) throw new ValidationError('Idade obrigatória');
    if (!req.body.breed) throw new ValidationError('Raça obrigatória');
    if (!req.body.weight) throw new ValidationError('Peso obrigatório');
    if (!req.body.gender) throw new ValidationError('Gênero obrigatório');
    if (!req.body.userId) throw new ValidationError('Id do usuário obrigatório');
    next();
  }
}