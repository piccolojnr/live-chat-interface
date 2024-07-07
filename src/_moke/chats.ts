import { faker } from "@faker-js/faker";
import { IChat } from "../types";
import { account } from "./account";

export const chats: IChat[] = [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    participants: [
        account
        , {
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            profilePicture: faker.image.avatar(),
        },
    ],
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
    type: index % 2 === 0 ? "private" : "group",
    name: index % 2 === 0 ? undefined : faker.lorem.words(),
    avatar: index % 2 === 0 ? undefined : faker.image.avatar(),
}));
