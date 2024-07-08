import { IChat, IUser } from "../types";

export const getChatName = (chat?: IChat | null, user?: IUser | null): string => {

    if (!chat || !user) {
        return "Chat";
    }


    let name = chat.name;
    if (chat.type === "group") {
        return name || "Group";
    }
    name = chat.participants[0].username === user.username
        ? chat.participants[1].username
        : chat.participants[0].username;

    return name || "User";
};