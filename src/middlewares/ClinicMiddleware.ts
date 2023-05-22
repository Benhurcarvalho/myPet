import { NextFunction, Request, Response } from 'express';
import ValidationError from '../errors/ValidationError';

export default class ClinicMiddleware {
  static validateCreate(req: Request, res: Response, next: NextFunction) {
    const { name, address, phone } = req.body;
    if (!name) {
      throw new ValidationError('Nome é obrigatório');
    }

    if (!address) {
      throw new ValidationError('Endereço é obrigatório');
    }

    if (!phone) {
      throw new ValidationError('Telefone é obrigatória');
    }

    next();
  }
}