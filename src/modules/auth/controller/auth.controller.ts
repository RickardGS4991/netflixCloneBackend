
import { Request, Response } from 'express';
import { UserInfo } from "../model/userInfo";
import { IUserDatasource } from '../interfaces/iUserDatasource';
import { LoginResponse } from '../model/login';

export class AuthController {
    constructor(private datasource: IUserDatasource) {}

    async register(req: Request, res: Response) {
        try {
            const registerUser: UserInfo = req.body;
            if(!registerUser){
                res.status(400).json({data: null, message: `Error`});
                return;
            }
            const user = await this.datasource.registerUser(registerUser);
            if(!user){
                res.status(404).json({data:null, message: `error on server`});
                return;
            }

            await this.datasource.imageProfile(user.id);

            res.status(201).json({data: user, message: `Request correctly made it`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async login(req: Request, res: Response){
        try {
            const loginInfo: UserInfo = req.body;
            if(!loginInfo){
                res.status(400).json({data: null, message: `Error`});
                return;
            }
            const user: LoginResponse = await this.datasource.login(loginInfo);
            if(!user){
                res.status(404).json({data:null, message: `error on server`});
                return;
            }

            let imagePath = await this.datasource.getImageProfile(user.userId);
            if(!imagePath){
                res.status(404).json({data:null, message: `error on server`});
                return;
            }

            user.imagePath = imagePath;
            res.status(201).json({data: user, message: `Request correctly made it`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async logout(req: Request, res: Response){
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if(!token){
                throw new Error(`Headers not available`);
            }

            
        } catch (error) {
            res.status(500).send();
        }
    }
}