import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { User } from './User';

async function generateFakeUser() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chs')
    const user = new User({
        matricule: faker.string.alphanumeric(10),
        password: faker.internet.password(),
        roles: [new mongoose.Types.ObjectId()],
        createdAt: faker.date.past(),
        deletedAt: faker.date.future(),
        updatedAt: faker.date.recent(),
    });
    return user.save();
}

async function generateFakeUsers(n) {
    for (let i = 0; i < n; i++) {
        await generateFakeUser();
    }
}

generateFakeUsers(10).then(() => console.log('Données factices générées.'));