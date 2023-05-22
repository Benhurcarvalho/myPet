import express from 'express';
import 'express-async-errors';
import ValidationError from './errors/ValidationError';
import ClinicMiddleware from './middlewares/ClinicMiddleware';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import PetMiddleware from './middlewares/PetMiddleware';
import UserMiddleware from './middlewares/UserMiddleware';
import ClinicService from './services/clinic.service';
import PetService from './services/pet.service';
import UserService from './services/user.service';

const app = express();
app.use(express.json());

app.post('/clinics', ClinicMiddleware.validateCreate, async (req, res) => {
  const created = await ClinicService.create(req.body);
  return res.json(created);
});

app.post('/users', UserMiddleware.validateCreate, async (req, res) => {
  const created = await UserService.create(req.body);
  return res.status(201).json(created);
});

app.post('/pets', PetMiddleware.validateCreate, async (req, res) => {
  const created = await PetService.create(req.body);
  return res.status(201).json(created);
});

// app.get('/pets', async (req, res) => {
//   const pets = await PetService.findAll();
//   return res.json(pets);
// });

app.get('/users', async (req, res) => {
  const users = await UserService.findAll();
  return res.json(users);
});

app.patch('/users/:id/change-password', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) throw new ValidationError('Senha é obrigatória');
  await UserService.changePassword(Number(id), password);
  return res.status(204).end();
});

app.use(ErrorMiddleware.handleError);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});