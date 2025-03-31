import { UserInfo } from "../model/userInfo";

export interface IUserDatasource {
    login(data: UserInfo): Promise<any>;
    registerUser(data: UserInfo): Promise<any>;
    logout(info: string): Promise<any>;
};