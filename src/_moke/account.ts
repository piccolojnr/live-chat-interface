import { faker } from "@faker-js/faker";

export const account = {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    profilePicture: faker.image.avatar(),
}