import { NextFunction, Request, Response } from 'express';
import ValidationError from '../errors/ValidationError';

export default class UserMiddleware {
  static validateCreate(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, role, clinicId } = req.body;
    if (!name) {
      throw new ValidationError('Nome é obrigatório');
    }

    if (!email) {
      throw new ValidationError('Email é obrigatório');
    }

    if (!password) {
      throw new ValidationError('Senha é obrigatória');
    }

    if (!role) {
      throw new ValidationError('Role é obrigatório');
    }

    if (!clinicId) {
      throw new ValidationError('Clinica é obrigatória');
    }

    next();
  }
}