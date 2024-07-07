import { faker } from "@faker-js/faker";
import { IMessage } from "../types";


export const messages: IMessage[] = [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    sender: {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        profilePicture: faker.image.avatar(),
    },
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(),
}));