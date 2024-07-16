import { IChat, IUser } from "../types";
import { Buffer } from 'buffer';


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


export const base64ToBuffer = (base64: string): Buffer => {
    return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
}

export const base64ToAscii = (base64: string): string => {
    return Buffer.from(base64, "base64").toString("ascii");
}


export const getUser = (chat: IChat, account: any) => {
    if (chat.type === "group") return null;
    return chat.participants[0].username === account?.username
        ? chat.participants[1]
        : chat.participants[0];
};


export const getAvatar = (chat: IChat, account: any) => {
    if (chat?.type === "group") {
        return chat?.avatar;
    } else {
        return account?.profilePicture;
    }
}