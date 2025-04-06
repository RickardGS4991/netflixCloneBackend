import { UserInfo } from "../model/userInfo";

export interface IUserDatasource {
    login(data: any): Promise<any>;
    registerUser(data: any): Promise<any>;
    getImageProfile(userId: string): Promise<any>;
    imageProfile(dataFromUser: any): Promise<void>;
};