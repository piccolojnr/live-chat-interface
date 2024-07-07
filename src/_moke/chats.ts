import { faker } from "@faker-js/faker";
import { IChat } from "../types";

export const chats: IChat[] = [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    participants: [...Array(2)].map(() => ({
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        profilePicture: faker.image.avatar(),
    })),
    lastMessage: {
        id: faker.datatype.uuid(),
        sender: {
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            profilePicture: faker.image.avatar(),
        },
        message: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString(),
    },
}));
