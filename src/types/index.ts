
export interface IMessage {
    id: string;
    sender: Pick<IUser, "id" | "username" | "profilePicture">;
    message: string;
    timestamp: string;
}


export interface IChat {
    id: string;
    participants: Pick<IUser, "id" | "username" | "profilePicture">[];
    lastMessage: IMessage;
}

interface IUser {
    id: string;
    username: string;
    phone?: string;
    profilePicture?: string;
}
