import { UserInfo } from "../model/userInfo";

export interface IUserDatasource {
    login(data: UserInfo): Promise<any>;
    registerUser(data: UserInfo): Promise<any>;
    getImageProfile(userId: string): Promise<string | null>;
    imageProfile(userId: any): Promise<void>;
};