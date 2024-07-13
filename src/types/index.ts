
export interface IMessage {
    id: string;
    sender: Pick<IUser, "id" | "username" | "profilePicture">;
    message: string;
    timestamp: string;
}


export interface IChat {
    id: string;
    name?: string;
    participants: Pick<IUser, "id" | "username" | "profilePicture">[];
    lastMessage?: IMessage;
    type?: "private" | "group";
    avatar?: string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    bio?: string;
}
