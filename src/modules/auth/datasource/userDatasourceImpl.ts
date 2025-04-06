import { supabase } from "../../../config";
import { IUserDatasource } from "../interfaces/iUserDatasource";
import { ImagePath } from "../model/imagesPaths";
import { LoginResponse } from "../model/login";

export class UserDatasource implements IUserDatasource{
    async login(info: any): Promise<LoginResponse | null> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword(info);
            if(!data){
                return null;
            }

            let success: LoginResponse = { userId: data.user!.id, accessToken: data.session!.access_token, refreshToken: data.session!.refresh_token};
            return success;
        } catch (error) {
            throw new Error('Unable to retrieve info from server');
        }
    }

    async registerUser(info: any): Promise<any> {
        try {
            const { data, error } = await supabase.auth.signUp(info);
            if(!data){
                return null;
            }
            return data.user;
        } catch (error) {
            throw new Error(`Error on server`);
        }
    }

    async getImageProfile(userId: string): Promise<any> {
        try {
            const { data, error} = await supabase.from('user_data').select('image_path, username').eq('id', userId);
            if(error){
                return null;
            }

            return data[0];

        } catch (error) {
            throw new Error(`Error on server`);
        }
    }

    async imageProfile(dataFromUser: any): Promise<void> {
        try {
            let arrImg = [ImagePath.image1, ImagePath.image2, ImagePath.image3];
            let randomCode = Math.floor(Math.random() * 3);

            let { error } = await supabase.from("user_data").insert([{
                id: dataFromUser.userId,
                image_path: arrImg[randomCode],
                username: dataFromUser.username
            }]);

            if(error){
                console.error(error);
            }

        } catch (error) {
            throw new Error("Error on server");
        }
    }
    
};