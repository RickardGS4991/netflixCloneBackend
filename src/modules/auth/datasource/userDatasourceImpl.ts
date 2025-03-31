import { supabase } from "../../../config";
import { IUserDatasource } from "../interfaces/iUserDatasource";
import { LoginResponse } from "../model/login";
import { UserInfo } from "../model/userInfo";

export class UserDatasource implements IUserDatasource{
    async login(info: UserInfo): Promise<LoginResponse | null> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword(info);
            if(!data){
                return null;
            }

            let success: LoginResponse = { accessToken: data.session!.access_token, refreshToken: data.session!.refresh_token};
            return success;
        } catch (error) {
            throw new Error('Unable to retrieve info from server');
        }
    }

    async registerUser(info: UserInfo): Promise<any> {
        try {
            const { data, error } = await supabase.auth.signUp(info);
            console.error(error);
            if(!data){
                return null;
            }
            return data.user;
        } catch (error) {
            throw new Error(`Error on server`);
        }
    }

    async logout(info: string): Promise<any> {
        
    }
};