import { faker } from "@faker-js/faker";


export const users = [...Array(10)].map(() => ({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    profilePicture: faker.image.avatar(),
}))