
export interface IMessage {
    _id: string;
    sender: Pick<IUser, "_id" | "username" | "profilePicture">;
    message: string;
    timestamp: string;
}


export interface IChat {
    _id: string;
    name?: string;
    participants: Pick<IUser, "_id" | "username" | "profilePicture">[];
    lastMessage?: IMessage;
    type?: "private" | "group";
    avatar?: string;
}

export interface IUser {
    _id: string;
    username: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    bio?: string;
}
