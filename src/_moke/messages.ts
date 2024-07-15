import { faker } from "@faker-js/faker";
import { IMessage } from "../types";
import { account } from "./account";

export const messages: IMessage[] = [...Array(20)].map((_, index) => ({
    _id: faker.string.uuid(),
    sender: faker.datatype.boolean() ? account : {
        _id: faker.string.uuid(),
        username: faker.internet.userName(),
        profilePicture: faker.image.avatar(),
    },
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(),
}));
