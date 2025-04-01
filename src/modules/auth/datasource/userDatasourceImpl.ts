import { supabase } from "../../../config";
import { IUserDatasource } from "../interfaces/iUserDatasource";
import { ImagePath } from "../model/imagesPaths";
import { LoginResponse } from "../model/login";
import { UserInfo } from "../model/userInfo";

export class UserDatasource implements IUserDatasource{
    async login(info: UserInfo): Promise<LoginResponse | null> {
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

    async registerUser(info: UserInfo): Promise<any> {
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

    async getImageProfile(userId: string): Promise<string | null> {
        try {
            const { data, error} = await supabase.from('images_profile').select('image_path').eq('id', userId);
            if(error){
                return null;
            }

            return data[0].image_path;

        } catch (error) {
            throw new Error(`Error on server`);
        }
    }

    async imageProfile(userId: any): Promise<void> {
        try {
            let arrImg = [ImagePath.image1, ImagePath.image2, ImagePath.image3];
            let randomCode = Math.floor(Math.random() * 3);

            let { error } = await supabase.from("images_profile").insert([{
                id: userId,
                image_path: arrImg[randomCode]
            }]);

            if(error){
                console.error(error);
            }

        } catch (error) {
            throw new Error("Error on server");
        }
    }
    
};