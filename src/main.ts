import ClinicService from "./services/clinic.service";
import PetService from "./services/pet.service";
import UserService from "./services/user.service";

// inserir uma clinica
async function main(): Promise<void> {
    const clinicCreate = await ClinicService.create({
        name: 'Pettrybe',
        address: 'Rua zero',
        phone: '00000'
    })
    console.log(clinicCreate)

    // inserir um user
    const userCreate = await UserService.create({
        name: 'Teste',
        email: 'teste@teste.com',
        password: '321321',
        role: 'admin',
        clinicId: clinicCreate.id,
    })
    console.log(userCreate)

    // busca com relacionamento 
    const userFound = await UserService.findById(userCreate.id);
    console.log(userFound);

    // criando o pet
    const petCreated = await PetService.create({
        name: 'Meg',
        age: 3,
        breed: 'caramelo',
        gender: 'femea',
        weight: 15,
        userId: userCreate.id,
    })
    console.log(petCreated)

    // relacionar um pet a uma clinica
    await ClinicService.addPet(petCreated.id, clinicCreate.id);
    const clinics = await ClinicService.findAll();
    console.dir(clinics, {depth: 4})
}


main();